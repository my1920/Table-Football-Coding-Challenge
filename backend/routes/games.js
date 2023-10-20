const express = require('express');
const { PrismaClient } = require('@prisma/client');

const Joi = require('joi');
const prisma = new PrismaClient();

const router = express.Router();



const gameSchema = Joi.object({
    idPlayer1: Joi.number().integer().required(),
    idPlayer2: Joi.number().integer().required(),
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




// POST /games
router.post('/', async (req, res) => {


    const { error, value } = gameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
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


// PUT /games/:gameid
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
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
