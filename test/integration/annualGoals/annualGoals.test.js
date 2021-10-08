/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
const app = require('../../../app');
const logger = require('../../../utils/logger');

const { expect } = chai;

const URL = '/api/v1/goals/catalog';
const type = 'annual';
const org_id = '6145d099285e4a184020742e' || '61578237b9b9f30465f49ee8';

chai.use(require('chai-http'));
chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

describe('ANNUAL GOALS TEST (INTEGRATION)', () => {
  let loggerStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
  });

  context('GETTING ANNUAL GOALS OF AN ORGANIZATION OR APPROPRIATE ERRORS', () => {
    it('Should check for query parameter: type, and return an error if not found', (done) => {
      chai
        .request(app)
        .get(`${URL}?org_id=${org_id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body).to.be.an('object').that.contains({ error: 'type is required' });
          done();
        });
    });

    it('Should check for query parameter: org_id, and return an error if not found', (done) => {
      chai
        .request(app)
        .get(`${URL}?type=${type}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body).to.be.an('object').that.contains({ error: 'org_id is required' });
          done();
        });
    });

    it('Should check for validity of query parameter: type, and return an error if invalid', (done) => {
      chai
        .request(app)
        .get(`${URL}?type=yaaay&org_id=${org_id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body)
            .to.be.an('object')
            .that.contains({ error: `type should either be 'annual' or 'quarterly'.` });
          done();
        });
    });

    it('Should GET /api/v1/goals/catalog', (done) => {
      chai
        .request(app)
        .get(`${URL}?type=${type}&org_id=${org_id}`)
        .end((error, res) => {
          if (error) expect(error).to.have.status(200);
          expect(loggerStub).to.have.been.called;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should return correct headers', (done) => {
      chai
        .request(app)
        .get(`${URL}?type=${type}&org_id=${org_id}`)
        .end((error, res) => {
          if (error) {
            expect(error).to.have.header('content-type', 'application/json; charset=utf-8');
          }
          expect(loggerStub).to.have.been.called;
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });

    it.skip('Should return an array of annual goals', (done) => {
      chai
        .request(app)
        .get(`${URL}?type=${type}&org_id=${org_id}`)
        .end((error, res) => {
          if (error) {
            expect(error).to.have.status(500);
            expect(error).to.be.json;
            expect(error.body).to.have.property('message', 'failed, server error.');
          }
          expect(loggerStub).to.have.been.called;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message', 'success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            res.body.data.forEach((goal) => expect(goal).to.be.an('object').that.contains({ goal_type: type }));
          }
          done();
        });
    });
  });
  context.skip('FAILING CASES', () => {});
});
