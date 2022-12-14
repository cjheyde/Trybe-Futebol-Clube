import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import { response } from "express";
import IMatch from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

const matchesTest = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
]

const matchIDTest = {
  "id": 41,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Internacional"
  },
}

const matchesPost = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

const matchesPostResult = {
  "id": 3,
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

const authorizationValid = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1ODk1MzE1LCJleHAiOjE2NjY0MTM3MTV9.vk0VkJaNqZc0bQ-xD3e8bsPgeMDnCtEYIYjsGRBmSbQ"
}

const authorizationInvalid = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1ODk1MzE1LCJleHAiOjE2NjY0MTM3MTV9.vk0VkJaNqZc0bQ-xD3e8bsPgeMDnCtEYIYjs"
}

const matchesPostMissing = {
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

const matchesPostSameTeams = {
  "homeTeam": 8,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

const matchesPostInexistingTeam = {
  "homeTeam": 800,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

describe('Matches Integration tests', () => {
  describe('/matches - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesTest as []);
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app).get('/matches');
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it('database values coorect', async () => {
      chaiHttpResponse = await chai
        .request(app).get('/matches');
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.deep.equal(matchesTest);
    });
  });
  describe('/matches - POST is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves(matchesPostResult as Match);
    });

    after(() => {
      sinon.restore();
    });

    it('status 201', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set(authorizationValid)
        .send(matchesPost);
      expect(chaiHttpResponse.status).to.equal(201);
    });
    it('database values correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set(authorizationValid)
        .send(matchesPost);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('inProgress');
      expect(chaiHttpResponse.body).to.deep.equal(matchesPostResult);
    });
  });
  describe('/matches - POST is not possible', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('No token informed - status 401 & Token not found', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({})
        .send(matchesPost);
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });
    it('Not valid token - status 401 & Token must be a valid token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set(authorizationInvalid)
        .send(matchesPost);
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
    });
    // it('missing information in the body - status 400 & All fields must be filled', async () => {
    //   chaiHttpResponse = await chai
    //     .request(app)
    //     .post('/matches')
    //     .set(authorizationValid)
    //     .send(matchesPostMissing);
    //   expect(chaiHttpResponse.status).to.equal(400);
    //   expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    // });
    it('informed homeTeam = awayTeam - status 401 & It is not possible to create a match with two equal teams', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set(authorizationValid)
        .send(matchesPostSameTeams);
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');
    });
    it('informed teams are not in database - status 404 & There is no team with such id!', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set(authorizationValid)
        .send(matchesPostInexistingTeam);
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body.message).to.equal('There is no team with such id!');
    });
  });
  describe('/matches/:id/finish - PATCH is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/41/finish')
        .set(authorizationValid)
        .send();
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Finished');
    });
  });
    describe('/matches/:id/finish - PATCH is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/41')
        .set(authorizationValid)
        .send();
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Match scores updated!');
    });
  });
});
