/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../../../app');
const glob = require('../../globals');
const sidebarSchema = require('./sidebarSchema.json');
chai.use(require('chai-json-schema-ajv'));

chai.use(chaiHTTP);

const URL = `/api/v1/sidebar/?org=${glob.orgID}&user=klaus`;

describe('SIDEBAR TESTS', () => {
  context('PASSING CASES', () => {
    it('Should GET /sidebar', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.not.be.an('error');
          done();
        });
    });

    it('Should return correct JSON', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(sidebarSchema, 'custom flag').to.be.validJsonSchema;
          expect(res.body).to.be.jsonSchema(sidebarSchema, 'custom flag');
          done();
        });
    });

    it('Should return correct headers', (done) => {
      chai
        .request(app)
        .get(URL)
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });
});
