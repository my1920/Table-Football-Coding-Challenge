const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const prismaClient  = require('../../client');
const app = require('../../index');

const expect = chai.expect;

describe('GET /players', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return a list of players', async () => {
        const mockData = [{ id: 1, name: 'Johny Does' }]

        prismaClient.players.findMany = sinon.stub().resolves(mockData);

        const res = await request(app).get('/players');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(mockData);
    });

    it('should handle errors', async () => {
        prismaClient.players.findMany = sinon.stub().rejects(new Error('DB error'));
    
        const res = await request(app).get('/players');
    
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error', 'Internal server error');
    });
    
});


describe('GET /players/stats', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return a list of all players with their statistics', async () => {
        const mockPlayers = [
            { id: 1, name: 'Johny Does' },
            { id: 2, name: 'Jany Doey' }
        ];

        prismaClient.players.findMany = sinon.stub().resolves(mockPlayers);

        const mockGamesForPlayerId1AsPlayer1 = [
            { id: 1, idPlayer1: 1, idPlayer2: 2, player1Score: 3, player2Score: 1 },
            { id: 2, idPlayer1: 1, idPlayer2: 2, player1Score: 1, player2Score: 3 }
        ];

        const mockGamesForPlayerId1AsPlayer2 = [
            { id: 3, idPlayer1: 2, idPlayer2: 1, player1Score: 4, player2Score: 2 }
        ];

        const mockGamesForPlayerId2AsPlayer1 = [
            { id: 3, idPlayer1: 2, idPlayer2: 1, player1Score: 4, player2Score: 2 }
        ];

        const mockGamesForPlayerId2AsPlayer2 = [
            { id: 1, idPlayer1: 1, idPlayer2: 2, player1Score: 3, player2Score: 1 },
            { id: 2, idPlayer1: 1, idPlayer2: 2, player1Score: 1, player2Score: 3 }
        ];

        const findManyStub = sinon.stub();
        prismaClient.games.findMany = findManyStub;

        findManyStub.onCall(0).resolves(mockGamesForPlayerId1AsPlayer1);
        findManyStub.onCall(1).resolves(mockGamesForPlayerId1AsPlayer2);
        findManyStub.onCall(2).resolves(mockGamesForPlayerId2AsPlayer1);
        findManyStub.onCall(3).resolves(mockGamesForPlayerId2AsPlayer2);

        const res = await request(app).get('/players/stats');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').of.length(2);
        expect(res.body[0]).to.deep.equal({
            id: 1,
            name: 'Johny Does',
            gamesPlayed: 3,
            wins: 1,
            losses: 2,
            goalsFor: 6,
            goalsAgainst: 8,
            goalsDifference: -2
        });
        expect(res.body[1]).to.deep.equal({
            id: 2,
            name: 'Jany Doey',
            gamesPlayed: 3,
            wins: 2,
            losses: 1,
            goalsFor: 8,
            goalsAgainst: 6,
            goalsDifference: 2
        });        
    });

    it('should handle internal server errors', async () => {
        prismaClient.players.findMany = sinon.stub().rejects(new Error('DB error'));

        const res = await request(app).get('/players/stats');

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error', 'Internal server error');
    });
});