import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Integration tests', () => {
  describe('/leaderboard/home - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub()
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
  });
  describe('/leaderboard/away - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub()
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
  });
  describe('/leaderboard - GET is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub()
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')
        .send();
      expect(chaiHttpResponse.status).to.equal(200);
    });
  });
});
