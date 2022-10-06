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
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1MDMwMzkyLCJleHAiOjE2NjU1NDg3OTJ9.XrQ12-O_jYIpGZPBrqo89ovNDI00KCLq4akcUHeqH-c"
  }

  const authorizationInvalid = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1MDMwMzkyLCJleHAiOjE2NjU1NDg3OTJ9"
  }

describe('Matches Integration tests', () => {
  describe('/matches - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesTest as []);
    });

    after(()=>{
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
      expect(chaiHttpResponse.body).to.be.an( 'array' );
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

    after(()=>{
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
    it('database values coorect', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set(authorizationValid)
         .send(matchesPost);
      expect(chaiHttpResponse.body).to.be.an( 'object' );
      expect(chaiHttpResponse.body).to.have.property( 'inProgress' );
      expect(chaiHttpResponse.body).to.deep.equal(matchesPostResult);
    });
  });
  //   describe('/matches/:id - GET is successfully done', () => {
  //   let chaiHttpResponse: Response;

  //   before(async () => {
  //     sinon
  //       .stub(Match, "findOne")
  //       .resolves(matchIDTest as any);
  //   });

  //   after(()=>{
  //     sinon.restore();
  //   });

  //   it('status 200', async () => {
  //     chaiHttpResponse = await chai
  //        .request(app).get('/matches/41').send();
  //     expect(chaiHttpResponse.status).to.equal(200);
  //   });
  //   it('values received are ok', async () => {
  //     chaiHttpResponse = await chai
  //        .request(app).get('/matches/41').send();
  //     expect(chaiHttpResponse.body).to.deep.equal(matchIDTest);
  //   });
  // });
});
