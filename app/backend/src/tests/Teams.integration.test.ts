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

describe('Teams Integration tests', () => {
  describe('/teams - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(teamsTest as Team[]);
    });

     after(()=>{
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app).get('/teams').send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it('values received are correct', async () => {
      before(async () => {
        sinon
          .stub(Team, "findAll")
          .resolves(teamsTest as Team[]);
      });
      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse.body).to.be.an( 'array' );
      expect(chaiHttpResponse.body).to.deep.equal(teamsTest);
    });
  });
  describe('/teams/:id - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves(teamIDTest as Team);
    });

    after(()=>{
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/teams/2').send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it('values received are correct', async () => {
      chaiHttpResponse = await chai
         .request(app).get('/teams/2').send();
      expect(chaiHttpResponse.body).to.be.an( 'object' );
      expect(chaiHttpResponse.body).to.have.property( 'id' );
      expect(chaiHttpResponse.body).to.have.property( 'teamName' );
      expect(chaiHttpResponse.body).to.deep.equal(teamIDTest);
    });
  });
});
