/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const { expect } = require('chai');
const app = require('../../../app');

chai.use(require('chai-http'));

describe('ANNUAL GOALS TEST', () => {
  context('GETTING ANNUAL GOALS OF AN ORGANIZATION', () => {
    it('Should return an array of annual goals', (done) => {
      chai
        .request(app)
        .get('/api/v1/goals/catalog?type=annual&org_id=6145d099285e4a184020742e')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.not.be.an('error');
          expect(res.body).to.have.property('message', 'success');
          done();
        });
    });

    it('Should return correct JSON', (done) => {
      chai
        .request(app)
        .get('/api/v1/goals/catalog?type=annual&org_id=6145d099285e4a184020742e')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array')
          res.body.data.forEach(goal => expect(goal).to.be.an('object').that.contains({goal_type: 'annual'}))
          done();
        });
    });

    it('Should return correct headers', (done) => {
      chai
        .request(app)
        .get('/api/v1/goals/catalog?type=annual&org_id=6145d099285e4a184020742e')
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });
  });
  context.skip('FAILING CASES', () => {});
});
