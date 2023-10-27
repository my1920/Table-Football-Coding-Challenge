const express = require('express');

const Joi = require('joi');
const prisma = require('../client');

const router = express.Router();



const gameSchema = Joi.object({
    idPlayer1: Joi.number().integer().required(),
    idPlayer2: Joi.number().integer().required()
        .custom((value, helpers) => {
            if (value === helpers.state.ancestors[0].idPlayer1) {
                return helpers.message('You cannot play against yourself');
            }
            return value;
        }, 'idPlayer2 Validation'),
    datetime: Joi.date().iso().optional(),
    player1score: Joi.when('datetime', {
        is: Joi.exist(),
        then: Joi.number().integer().required(),
        otherwise: Joi.forbidden()
    }),
    player2score: Joi.when('datetime', {
        is: Joi.exist(),
        then: Joi.number().integer().required(),
        otherwise: Joi.forbidden()
    })
});




/**
 * @openapi
 * /games:
 *   post:
 *     tags:
 *       - Games
 *     description: Create a new game
 *     requestBody:
 *       description: Game object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idPlayer1
 *               - idPlayer2
 *             properties:
 *               idPlayer1:
 *                 type: integer
 *               idPlayer2:
 *                 type: integer
 *               datetime:
 *                 type: string
 *                 format: date-time
 *               player1score:
 *                 type: integer
 *               player2score:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully created game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 idPlayer1:
 *                   type: integer
 *                 idPlayer2:
 *                   type: integer
 *                 player1Score:
 *                   type: integer
 *                 player2Score:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', async (req, res) => {


    const { error, value } = gameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const player1Exists = await prisma.players.findUnique({
            where: { id: value.idPlayer1 }
        });
        
        const player2Exists = await prisma.players.findUnique({
            where: { id: value.idPlayer2 }
        });

        if (!player1Exists) {
            return res.status(400).json({ error: `Player with Id ${value.idPlayer1} does not exist.` });
        }
        
        if (!player2Exists) {
            return res.status(400).json({ error: `Player with Id ${value.idPlayer2} does not exist.` });
        }
    } catch (err) {
        console.error("Error checking player existence:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    if (value.datetime !== undefined) {
        try {
            const newGame = await prisma.games.create({
                data: {
                    idPlayer1: value.idPlayer1,
                    idPlayer2: value.idPlayer2,
                    date: value.datetime,
                    player1Score: value.player1score,
                    player2Score: value.player2score
                }
            });
            res.json(newGame);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        try {
            const newGame = await prisma.games.create({
                data: {
                    idPlayer1: value.idPlayer1,
                    idPlayer2: value.idPlayer2,
                    date:  new Date(),
                    player1Score: 0,
                    player2Score: 0
                }
            });
            res.json(newGame);
        } catch (err) {
            console.log("err", err)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
});




const updateGameSchema = Joi.object({
    playerid: Joi.number().integer().required(),
    score: Joi.number().integer().required()
});


/**
 * @openapi
 * /games/{gameid}:
 *   put:
 *     tags:
 *       - Games
 *     description: Update game score
 *     parameters:
 *       - name: gameid
 *         description: Game's id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Player ID and score to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playerid
 *               - score
 *             properties:
 *               playerid:
 *                 type: integer
 *               score:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated game score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 idPlayer1:
 *                   type: integer
 *                 idPlayer2:
 *                   type: integer
 *                 player1Score:
 *                   type: integer
 *                 player2Score:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:gameid', async (req, res) => {
    const gameId = parseInt(req.params.gameid);
    if (isNaN(gameId)) {
        return res.status(400).json({ error: 'Invalid game ID' });
    }

    const { error, value } = updateGameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const game = await prisma.games.findUnique({ where: { id: gameId } });
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        let updateData;
        if (game.idPlayer1 === value.playerid) {
            updateData = { player1Score: value.score };
        } else if (game.idPlayer2 === value.playerid) {
            updateData = { player2Score: value.score };
        } else {
            return res.status(400).json({ error: 'Invalid player ID for this game' });
        }

        const updatedGame = await prisma.games.update({
            where: { id: gameId },
            data: updateData
        });
        res.json(updatedGame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
