import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
import { response } from "express";

chai.use(chaiHttp);

const { expect } = chai;

const teamsTest = [
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
]

const teamIDTest = 	{
		"id": 2,
		"teamName": "Bahia"
	}

describe('route /teams', () => {
  describe('route /teams - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(teamsTest as Team[]);
    });

    after(()=>{
      sinon.restore();
    });

    it('get successfully all teams from database', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/teams').send();
      chai.expect(response.status).to.equal(200);
      chai.expect(response.json).to.equal(teamsTest);
    });
  });
    describe('route /teams:id - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves(teamIDTest as Team);
    });

    after(()=>{
      sinon.restore();
    });

    it('get successfully the team with id = specified', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/teams/2').send();
      chai.expect(response.status).to.equal(200);
      chai.expect(response.json).to.equal(teamIDTest);
    });
  });
});
