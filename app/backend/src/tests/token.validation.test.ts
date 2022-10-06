import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const authorizationValid = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1MDMwMzkyLCJleHAiOjE2NjU1NDg3OTJ9.XrQ12-O_jYIpGZPBrqo89ovNDI00KCLq4akcUHeqH-c"
}

const authorizationInvalid = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY1MDMwMzkyLCJleHAiOjE2NjU1NDg3OTJ9"
}

describe('tokenValidation tests', () => {
  describe('token Valid', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findAll")
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('validate token - status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set(authorizationValid);
      expect(chaiHttpResponse.status).to.equal(200);
    });
  });
  describe('token NOT Valid', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findAll")
        .resolves();
    });

    after(() => {
      sinon.restore();
    });

    it('cannot validate token - status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set(authorizationInvalid);
      expect(chaiHttpResponse.status).to.equal(401);
    });
    it('cannot validate token - message "A Token must be a valid token"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set(authorizationInvalid);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
    });
  });
});

