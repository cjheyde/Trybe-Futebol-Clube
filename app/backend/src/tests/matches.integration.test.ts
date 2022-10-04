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

const matchIDTest = 	{
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

describe('route /matches', () => {
  describe('route /matches - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesTest as any);
    });

    after(()=>{
      sinon.restore();
    });

    it('get successfully all matches from database', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/matches').send();
      chai.expect(response.status).to.equal(200);
      chai.expect(response.json).to.equal(matchesTest);
    });
  });
    describe('route /matches:id - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findOne")
        .resolves(matchIDTest as any);
    });

    after(()=>{
      sinon.restore();
    });

    it('get successfully the match with id = specified', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/matches/41').send();
      chai.expect(response.status).to.equal(200);
      chai.expect(response.json).to.equal(matchIDTest);
    });
  });
});
