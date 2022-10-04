import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userTest = {
  id: 1,
  username: 'testName',
  role: 'admin',
  email: 'test@test.com',
  password: '888888',
}

const loginTest = {
  email: 'test@test.com',
  password: '888888',
}

describe('loginValidation tests', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userTest as User);
    });

    after(()=>{
      sinon.restore();
    });

    it('cannot login without email', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ ...loginTest, email: '', });
      expect(chaiHttpResponse.status).to.equal(400);
    });
    it('cannot login without password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ ...loginTest, password: '', });
      expect(chaiHttpResponse.status).to.equal(400);
    });
  });

