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
const { orgID, visionRead } = require('../../globals');
const sampleVision = require('./sampleVision.json');

const URL = `/api/v1/vision/${orgID}`;

chai.use(chaiHTTP);
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('VISION TESTS', () => {
  let loggerStub;
  let axiosStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
    axiosStub = sandbox.stub(axios, 'get').returns({ data: { data: sampleVision } });
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
  });

  context('GET /api/v1/vision/:org_id', () => {
    it('Should check for org_id param', (done) => {
      chai
        .request(app)
        .get('/api/v1/vision')
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
          done();
        });
    });

    it('Should get vision successfully', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.have.status(200);
          expect(loggerStub).to.have.been.called;
          expect(axiosStub).to.have.been.calledOnce;
          expect(axiosStub).to.have.been.calledWith(visionRead);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', 200);
          expect(res.body).to.have.property('message', 'success');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });
});
