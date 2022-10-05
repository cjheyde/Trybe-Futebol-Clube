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
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const loginTest = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const wrongEmailTest = {
  email: 'teste.com',
  password: 'secret_admin',
};

const wrongPasswordTest = {
  email: 'admin@admin.com',
  password: 'kekek',
};

const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

const authorization = tokenTest;

describe('userController tests', () => {
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

    it('can login with correct email and Password - status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send( loginTest );
      expect(chaiHttpResponse.status).to.equal(200);
    });
    it('can login with correct email and Password - message { token }', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send( loginTest );
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property( 'token' );
    });
  });
    describe('route /login - POST is not possible', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userTest as User);
    });

    after(()=>{
      sinon.restore();
    });

    // it('cannot login with a wrong email - status 401', async () => {
    //   chaiHttpResponse = await chai.request(app).post('/login').send( wrongEmailTest );
    //   expect(chaiHttpResponse.status).to.equal(401);
    //   expect(chaiHttpResponse.body.message).to.equal( 'Incorrect email or password' );
    // });
    it('cannot login with a wrong password - status 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send( wrongPasswordTest );
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body.message).to.equal( 'Incorrect email or password' );
    });
  });
  // describe('route /login/validate - GET is successfully done', () => {
  //   let chaiHttpResponse: Response;

  //   after(()=>{
  //     sinon.restore();
  //   });

  //   it('login is validated - status 200', async () => {
  //     chaiHttpResponse = await chai.request(app).post('/login/validate').send();
  //     expect(chaiHttpResponse.status).to.equal(200);
  //   });
  //   it('login is validated  - message { token }', async () => {
  //     chaiHttpResponse = await chai.request(app).post('/login').send();
  //     expect(chaiHttpResponse.body).to.have.property( 'token' );
  //   });
  // });
});
