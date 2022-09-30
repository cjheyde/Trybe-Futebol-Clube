import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';
import { response } from "express";

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

const tokenTest = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
}

describe('route /login', () => {
  describe('route /login - POST is successfully done', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userTest as User);
    });

    after(()=>{
      sinon.restore();
    });

    it('login successfully', async () => {
      chaiHttpResponse = await chai
         .request(app).post('/login').send(loginTest);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.json).to.equal(tokenTest);
    });

    it('cannot login without email', async () => {
      const response = await chai.request(app).post('/login').send({ ...loginTest, email: '', });
      chai.expect(response.status).to.equal(400);
    });
  });
});
