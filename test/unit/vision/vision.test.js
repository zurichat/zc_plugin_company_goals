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
// const publishCntrl = require('../../../controllers/centrifugoController');
const logger = require('../../../utils/logger');
const { urls, defaultOrg } = require('../../globals');
const sampleVision = require('./sampleVision.json');

const URL = `/api/v1/vision/${defaultOrg}`;

chai.use(chaiHTTP);
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('VISION TESTS', () => {
  let loggerStub;
  let axiosGetStub;
  // let axiosPutStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
    axiosGetStub = sandbox.stub(axios, 'get').returns({ data: { data: sampleVision } });
    // axiosPutStub = sandbox.stub(axios, 'put').returns({ data: { data: { ...sampleVision, modified_documents: 1 } } });
    // pubStubA = sandbox.stub(publishCntrl, 'publish').returns(true);
    // pubStubB = sandbox.stub(publishCntrl, 'test').returns(true);
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
    sinon.restore();
  });

  context('GET VISION', () => {
    it('Should get vision successfully', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(loggerStub).to.have.been.called;
          expect(axiosGetStub).to.have.been.calledOnce;
          expect(axiosGetStub).to.have.been.calledWith(urls().visionRead);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', 200);
          expect(res.body).to.have.property('message', 'success');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });

  context('UPDATE VISION', () => {
    it('Should fail to update vision', (done) => {
      const axiosPutStub = sinon
        .stub(axios, 'put')
        .returns({ data: { data: { ...sampleVision, modified_documents: 0 } } });
      // const pubspy = sinon.spy(publishCntrl, 'publish');
      chai
        .request(app)
        .patch(URL)
        .send({ vision: `out like a light.` })
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(axiosPutStub).to.have.been.calledOnce;
          // expect(pubspy).to.have.been.calledOnce;
          // expect(publishCntrl).to.have.been.calledOnce;
          expect(res.body).to.have.property('message', 'No matching documents were found');
          done();
        });
    });

    it('Should update vision successfully', (done) => {
      sinon.restore();
      const axiosPutStub = sinon
        .stub(axios, 'put')
        .returns({ data: { data: { ...sampleVision, modified_documents: 1 } } });
      chai
        .request(app)
        .patch(URL)
        .send({ vision: `Always Strive And Prosper.` })
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
