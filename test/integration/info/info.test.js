/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../../../app');
const infoSchema = require('./infoSchema.json');
chai.use(require('chai-json-schema-ajv'));

chai.use(chaiHTTP);

describe('INFO TESTS', () => {
  context('PASSING CASES', () => {
    it('Should GET /info', (done) => {
      chai
        .request(app)
        .get('/info')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.not.be.an('error');
          expect(res.body).to.have.property('status', 'success');
          done();
        });
    });

    it('Should return correct JSON', (done) => {
      chai
        .request(app)
        .get('/info')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(infoSchema, 'custom flag').to.be.validJsonSchema;
          expect(res.body).to.be.jsonSchema(infoSchema, 'custom flag');
          done();
        });
    });

    it('Should return correct headers', (done) => {
      chai
        .request(app)
        .get('/info')
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });
  context.skip('FAILING CASES', () => {});
});
