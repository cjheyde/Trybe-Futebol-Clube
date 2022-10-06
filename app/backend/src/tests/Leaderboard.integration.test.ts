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
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves();
    });

    after(()=>{
      sinon.restore();
    });

    it('status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/leaderboard')
        .send();
      expect(chaiHttpResponse.status).to.equal(400);
    });
  });
