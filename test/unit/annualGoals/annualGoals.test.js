/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const app = require('../../../app');

const { expect } = chai;
const type= 'annual'
const org_id = '6145d099285e4a184020742e' || '61578237b9b9f30465f49ee8'

chai.use(require('chai-http'));

describe('ANNUAL GOALS TEST', () => {
  context('GETTING ANNUAL GOALS OF AN ORGANIZATION OR APPROPRIATE ERRORS', () => {
    it('Should return an array of annual goals', (done) => {
      chai
        .request(app)
        .get(`/api/v1/goals/catalog?type=${type}&org_id=${org_id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body).to.have.property('message', 'success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array')
          if (res.body.data.length > 0) {
            res.body.data.forEach(goal => expect(goal).to.be.an('object').that.contains({goal_type: 'annual'}))
          }
          done();
        });
    });

    it('Should check for query parameter: type, and return an error if not found', (done) => {
      chai
        .request(app)
        .get(`/api/v1/goals/catalog?org_id=${org_id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body).to.be.an('object').that.contains({ error: 'type is required' })
          done();
        });
    });

    it('Should check for query parameter: org_id, and return an error if not found', (done) => {
      chai
        .request(app)
        .get(`/api/v1/goals/catalog?type=${type}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(err).to.not.be.an('error');
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          expect(res.body).to.be.an('object').that.contains({ error: 'org_id is required' })
          done();
        });
    });
  });
  context.skip('FAILING CASES', () => {});
});
