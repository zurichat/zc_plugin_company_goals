/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../../../app');
const glob = require('../../globals');
const createGoalSchema = require('./createGoalSchema.json');
chai.use(require('chai-json-schema-ajv'));

chai.use(chaiHTTP);

const goalName = 'Test Title';
const category = 'Weekend';
const startDate = '11-3-2021';
const dueDate = '11-20-2021';
const goalType = 'annual';
const orgId = '61578237b9b9f30465f49ee8';
const payload = {
  goal_name: goalName,
  start_date: startDate,
  due_date: dueDate,
  goal_type: goalType,
  category,
};
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpFMk1UQXhOM3hIZDNkQlIwUlplRTVVWjNkYWFrMDFUMFJqTVU1RVFtdFBSMUYzVFZkYWJWbDZUVEZaVVQwOWZKZ0VOcWZSUzl1WE1wZ09VOE5tazBTQS1nYzcxZDVuUE5LOGNGUDdieFZXIiwiZW1haWwiOiJjcmVhdG9yQGdvYWxzLmNvbSIsImlkIjoiNjE1ODBmMzk4NzU0MGQ4ZDAxZmZjMzVhIiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6Nzk0MDM1NDI2NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.J5af59JPKGVaqjl-8DKbJ-rTyoT9R07wnJOf9GJkpJg';
const URL = `/api/v1/goals/?org_id=${orgId}`;

describe('CREATE GOAL TESTS', () => {
  context('PASSING CASES', () => {
    afterEach(() => {});

    it('Should return error if body is empty or incorrect', (done) => {
      chai
        .request(app)
        .post(URL)
        .send({})
        .set('Authorization', `Bearer ${token} ${orgId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('Should return error if goal_name is not sent', (done) => {
      chai
        .request(app)
        .post(URL)
        .send({ start_date: startDate, due_date: dueDate, goal_type: goalType, category })
        .set('Authorization', `Bearer ${token} ${orgId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('Should successfully create goal', (done) => {
      chai
        .request(app)
        .post(URL)
        .send(payload)
        .set('Authorization', `Bearer ${token} ${orgId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.not.be.an('error');

          chai
            .request(app)
            .get(`/api/v1/goals/single?org_id=${orgId}&room_id=${res.body.data.room_id}`)
            .set('Authorization', `Bearer ${token} ${orgId}`)
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              chai
                .request(app)
                .delete(`/api/v1/goals/delete?org_id=${orgId}&goal_id=${res2.body.data.goal[0]._id}`)
                .set('Authorization', `Bearer ${token} ${orgId}`)
                .end((err3, res3) => {
                  expect(res3).to.have.status(200);
                  done();
                });
            });
        });
    });

    it('Should return correct JSON', (done) => {
      chai
        .request(app)
        .post(URL)
        .send(payload)
        .set('Authorization', `Bearer ${token} ${orgId}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(createGoalSchema, 'custom goal').to.be.validJsonSchema;
          expect(res.body).to.be.jsonSchema(createGoalSchema, 'custom goal');
          chai
            .request(app)
            .get(`/api/v1/goals/single?org_id=${orgId}&room_id=${res.body.data.room_id}`)
            .set('Authorization', `Bearer ${token} ${orgId}`)
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              chai
                .request(app)
                .delete(`/api/v1/goals/delete?org_id=${orgId}&goal_id=${res2.body.data.goal[0]._id}`)
                .set('Authorization', `Bearer ${token} ${orgId}`)
                .end((err3, res3) => {
                  expect(res3).to.have.status(200);
                  done();
                });
            });
        });
    });
    it('Should return correct headers', (done) => {
      chai
        .request(app)
        .post(URL)
        .send(payload)
        .set('Authorization', `Bearer ${token} ${orgId}`)
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          chai
            .request(app)
            .get(`/api/v1/goals/single?org_id=${orgId}&room_id=${res.body.data.room_id}`)
            .set('Authorization', `Bearer ${token} ${orgId}`)
            .end((err2, res2) => {
              expect(res2).to.have.status(200);
              chai
                .request(app)
                .delete(`/api/v1/goals/delete?org_id=${orgId}&goal_id=${res2.body.data.goal[0]._id}`)
                .set('Authorization', `Bearer ${token} ${orgId}`)
                .end((err3, res3) => {
                  expect(res3).to.have.status(200);
                  done();
                });
            });
        });
    });
  });
});
