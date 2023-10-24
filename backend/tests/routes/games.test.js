const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const prismaClient  = require('../../client');
const app = require('../../index');

const expect = chai.expect;

describe('POST /games', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should successfully create a game only providing players ids', async () => {
        const reqData = { idPlayer1: 1, idPlayer2: 2 };
        const mockData = { ...reqData, id: 10, date: new Date().toISOString(), player1Score: 0, player2Score: 0 };

        prismaClient.games.create = sinon.stub().resolves(mockData);

        const res = await request(app).post('/games').send(reqData);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(mockData);
    });

    it('should successfully create a game providing all datas', async () => {
        const reqData = { idPlayer1: 1, idPlayer2: 2, datetime: new Date().toISOString(), player1score: 10, player2score: 5 };
        const mockData = { ...reqData, id: 10, date: new Date(reqData.datetime).toISOString() };

        prismaClient.games.create = sinon.stub().resolves(mockData);

        const res = await request(app).post('/games').send(reqData);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(mockData);
    });

    it('should handle validation errors', async () => {
        const reqData = { idPlayer1: 1 };

        const res = await request(app).post('/games').send(reqData);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
    });

    it('should handle database errors', async () => {
        const reqData = { idPlayer1: 1, idPlayer2: 2 };

        prismaClient.games.create = sinon.stub().rejects(new Error('DB error'));

        const res = await request(app).post('/games').send(reqData);

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error', 'Internal server error');
    });
});



describe('PUT /games/{gameid}', () => {
    
    afterEach(() => {
        sinon.restore();
    });

    it('should update a game score', async () => {
        const gameId = 1;
        const playerid = 2;
        const score = 11;

        const mockData = {
            id: gameId,
            idPlayer1: 1,
            idPlayer2: playerid
        };


        prismaClient.games.findUnique = sinon.stub().resolves(mockData);
        prismaClient.games.update = sinon.stub().resolves({ ...mockData, player2Score: score });

        const res = await request(app).put(`/games/${gameId}`).send({ playerid, score });

        expect(res.status).to.equal(200);
        expect(res.body.player2Score).to.equal(score);
    });

    it('should handle invalid game ID', async () => {
        const res = await request(app)
            .put('/games/invalid')
            .send({ playerid: 2, score: 15 });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'Invalid game ID');
    });

    it('should handle game not found', async () => {

        prismaClient.games.findUnique = sinon.stub().resolves(null);

        const res = await request(app).put('/games/15').send({ playerid: 2, score: 15 });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Game not found');
    });

    it('should handle invalid player ID for the game', async () => {
        const mockData = {
            id: 1,
            idPlayer1: 1,
            idPlayer2: 2
        };
        

        prismaClient.games.findUnique = sinon.stub().resolves(mockData);

        const res = await request(app).put('/games/1').send({ playerid: 3, score: 12 });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'Invalid player ID for this game');
    });

    it('should handle errors', async () => {

        prismaClient.games.findUnique = sinon.stub().rejects(new Error('DB error'));

        const res = await request(app).put('/games/1').send({ playerid: 2, score: 13 });

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error', 'Internal server error');
    });
});