// /* eslint-disable no-undef */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-underscore-dangle */
// const axios = require('axios');
// const { expect } = require('chai');
// const chai = require('chai');
// const chaiHTTP = require('chai-http');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const app = require('../../../app');
// const logger = require('../../../utils/logger');
// // const glob = require('../../globals');
// const createGoalSchema = require('./createGoalSchema.json');
// chai.use(require('chai-json-schema-ajv'));

// chai.use(chaiHTTP);
// chai.use(sinonChai);
// const sandbox = sinon.createSandbox();

// const goalName = 'Test Title';
// const category = 'Weekend';
// const startDate = '11-3-2021';
// const dueDate = '11-20-2021';
// const goalType = 'annual';
// const orgId = '61578237b9b9f30465f49ee8';
// const payload = {
//   goal_name: goalName,
//   start_date: startDate,
//   due_date: dueDate,
//   goal_type: goalType,
//   category,
// };
// const URL = `/api/v1/goals/`;
// const orgURL = `/api/v1/goals/?org_id=${orgId}`;

// const zcUrl = 'https://api.zuri.chat/auth/login';
// const testLogin = {
//   email: 'creator@goals.com',
//   password: 'Password123##',
// };

// describe('CREATE GOAL TESTS', () => {
//   context('PASSING Goal CASES', () => {
//     let token;
//     let roomId;
//     let loggerStub;

//     beforeEach(() => {
//       // Disable logger messages
//       loggerStub = sandbox.stub(logger, 'info').returns('');
//     });
//     // retrieve token from zuri core
//     before(async () => {
//       await axios
//         .post(zcUrl, testLogin)
//         .then((res) => {
//           expect(res).to.have.status(200);
//           const { data } = res;
//           token = data.data.user.token;
//         })
//         .catch((err) => {
//           expect(err).to.not.be.an('error');
//         });
//     });

//     // delete the created goal after test
//     afterEach((done) => {
//       if (roomId != null) {
//         chai
//           .request(app)
//           .get(`/api/v1/goals/single?org_id=${orgId}&room_id=${roomId}`)
//           .set('Authorization', `Bearer ${token} ${orgId}`)
//           .end((err2, res2) => {
//             expect(res2).to.have.status(200);
//             chai
//               .request(app)
//               .delete(`/api/v1/goals/delete?org_id=${orgId}&goal_id=${res2.body.data.goal[0]._id}`)
//               .set('Authorization', `Bearer ${token} ${orgId}`)
//               .end((err3, res3) => {
//                 expect(res3).to.have.status(200);
//                 done();
//               });
//           });
//       } else {
//         done();
//       }
//     });

//     // Refresh sandbox for each test
//     afterEach(() => {
//       sandbox.restore();
//     });

//     it('Should return error if no organization id is passed', (done) => {
//       chai
//         .request(app)
//         .post(URL)
//         .send({})
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.have.status(400);
//           done();
//         });
//     });

//     it('Should return error if body is empty or incorrect', (done) => {
//       chai
//         .request(app)
//         .post(orgURL)
//         .send({})
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.have.status(400);
//           done();
//         });
//     });

//     it('Should return error if goal_name is not sent', (done) => {
//       chai
//         .request(app)
//         .post(orgURL)
//         .send({ start_date: startDate, due_date: dueDate, goal_type: goalType, category })
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.have.status(400);
//           done();
//         });
//     });

//     it('Should successfully create goal', (done) => {
//       chai
//         .request(app)
//         .post(orgURL)
//         .send(payload)
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.have.status(200);
//           expect(err).to.not.be.an('error');
//           roomId = res.body.data.room_id;
//           done();
//         });
//     });

//     it('Should return correct JSON', (done) => {
//       chai
//         .request(app)
//         .post(orgURL)
//         .send(payload)
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.be.json;
//           expect(createGoalSchema, 'custom goal').to.be.validJsonSchema;
//           expect(res.body).to.be.jsonSchema(createGoalSchema, 'custom goal');
//           roomId = res.body.data.room_id;
//           done();
//         });
//     });
//     it('Should return correct headers', (done) => {
//       chai
//         .request(app)
//         .post(orgURL)
//         .send(payload)
//         .set('Authorization', `Bearer ${token} ${orgId}`)
//         .end((err, res) => {
//           expect(loggerStub).to.have.been.called;
//           expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
//           roomId = res.body.data.room_id;
//           done();
//         });
//     });
//   });
// });
