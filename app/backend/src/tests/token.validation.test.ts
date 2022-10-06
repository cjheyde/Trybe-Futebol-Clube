import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('tokenValidation tests', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findAll")
        .resolves();
    });

    after(()=>{
      sinon.restore();
    });

    it('cannot validate token - status 400', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send();
      expect(chaiHttpResponse.status).to.equal(400);
    });
    it('cannot validate token - message "A Token needs to be informed"', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send();
      expect(chaiHttpResponse.body).to.have. property( 'message' );
      expect(chaiHttpResponse.body.message).to.equal( 'A Token needs to be informed' );
    });
  });

