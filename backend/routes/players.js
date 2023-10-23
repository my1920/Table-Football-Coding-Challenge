const express = require('express');
const { PrismaClient } = require('@prisma/client');

const Joi = require('joi');
const prisma = new PrismaClient();

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     tags:
 *       - Players
 *     description: Retrieve a list of all players with their id and name
 *     responses:
 *       200:
 *         description: List of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
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

router.get('/', async (req, res) => {
    try {
        const players = await prisma.players.findMany({
            select: {
                id: true,
                name: true
            },
        });
        res.json(players);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



/**
 * @swagger
 * /players/stats:
 *   get:
 *     tags:
 *       - Players
 *     description: Retrieve a list of all players with their statistics
 *     responses:
 *       200:
 *         description: List of players with statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   gamesPlayed:
 *                     type: integer
 *                   wins:
 *                     type: integer
 *                   losses:
 *                     type: integer
 *                   goalsFor:
 *                     type: integer
 *                   goalsAgainst:
 *                     type: integer
 *                   goalsDifference:
 *                     type: integer
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
router.get('/stats', async (req, res) => {
    try {
        const players = await prisma.players.findMany();
        
        const playerStats = await Promise.all(players.map(async (player) => {
            const gamesAsPlayer1 = await prisma.games.findMany({
                where: { idPlayer1: player.id }
            });
            const gamesAsPlayer2 = await prisma.games.findMany({
                where: { idPlayer2: player.id }
            });

            const totalGames = gamesAsPlayer1.length + gamesAsPlayer2.length;
            const winsAsPlayer1 = gamesAsPlayer1.filter(game => game.player1Score > game.player2Score).length;
            const winsAsPlayer2 = gamesAsPlayer2.filter(game => game.player2Score > game.player1Score).length;

            const lossesAsPlayer1 = gamesAsPlayer1.length - winsAsPlayer1;
            const lossesAsPlayer2 = gamesAsPlayer2.length - winsAsPlayer2;

            const goalsFor = gamesAsPlayer1.reduce((acc, game) => acc + game.player1Score, 0) +
                             gamesAsPlayer2.reduce((acc, game) => acc + game.player2Score, 0);

            const goalsAgainst = gamesAsPlayer1.reduce((acc, game) => acc + game.player2Score, 0) +
                                 gamesAsPlayer2.reduce((acc, game) => acc + game.player1Score, 0);

            return {
                id: player.id,
                name: player.name,
                gamesPlayed: totalGames,
                wins: winsAsPlayer1 + winsAsPlayer2,
                losses: lossesAsPlayer1 + lossesAsPlayer2,
                goalsFor,
                goalsAgainst,
                goalsDifference: goalsFor - goalsAgainst
            };
        }));

        res.json(playerStats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;