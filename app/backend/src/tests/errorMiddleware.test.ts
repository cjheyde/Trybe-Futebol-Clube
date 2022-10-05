import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('errorMiddleware tests', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findAll")
        .resolves();
    });

    after(()=>{
      sinon.restore();
    });

    it('cannot find /tests GET - status 404', async () => {
      chaiHttpResponse = await chai.request(app).get('/tests').send();
      expect(chaiHttpResponse.status).to.equal(404);
    });
    // it('cannot find /tests GET - message - Not Found', async () => {
    //   chaiHttpResponse = await chai.request(app).get('/tests').send();
    //   expect(chaiHttpResponse.body).to.have.property( 'message' );
    // });
  });

