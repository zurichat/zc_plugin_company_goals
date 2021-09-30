const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../../app');
const db = require('../../../db/databaseHelper');
const sampleVision = require('./sampleVision.json');

chai.use(chaiHTTP);
chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('VISION', () => {
  let findStub;
  let sampleArgs;

  beforeEach(() => {
    findStub = sandbox.stub(db, 'find').resolves(sampleVision);
  });

  // Refresh stubs and spies for each test
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
  });
});
