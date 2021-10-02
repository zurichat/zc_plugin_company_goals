/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { default: axios } = require('axios');
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../app');
const logger = require('../../../utils/logger');
const { urls, defaultOrg } = require('../../globals');
const sampleMission = require('./sampleMission.json');

const URL = `/api/v1/mission/${defaultOrg}`;

chai.use(chaiHTTP);
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('MISSION TESTS', () => {
  let loggerStub;
  let axiosGetStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
    axiosGetStub = sandbox.stub(axios, 'get').returns({ data: { data: sampleMission } });
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
  });

  context('GET MISSION', () => {
    it('Should get mission successfully', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(loggerStub).to.have.been.called;
          expect(axiosGetStub).to.have.been.calledOnce;
          expect(axiosGetStub).to.have.been.calledWith(urls().missionRead);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', 200);
          expect(res.body).to.have.property('message', 'success');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });

  context('UPDATE MISSION', () => {
    it('Should update mission successfully', (done) => {
      sinon.restore();
      const axiosPutStub = sinon
        .stub(axios, 'put')
        .returns({ data: { data: { ...sampleMission, modified_documents: 1 } } });
      chai
        .request(app)
        .patch(URL)
        .send({ mission: `Eh Macarena` })
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.have.status(200);
          expect(axiosPutStub).to.have.been.calledOnce;
          expect(res.body).to.have.property('message', 'success');
          expect(res.body).to.have.property('status', 200);
        });
      done();
    });
  });
});
