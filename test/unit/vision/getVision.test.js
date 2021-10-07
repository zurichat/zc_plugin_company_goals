/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const chai = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const dbh = require('../../../db/databaseHelper');
const AppError = require('../../../utils/appError');
const logger = require('../../../utils/logger');

const findVision = rewire('../../../services/visionService.js');

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('GET VISION TESTS (UNIT)', () => {
  let loggerStub;
  let findStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
    findStub = sandbox.stub(dbh, 'find');
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
  });

  context('Test Invalid orgID', () => {
    it('Should fail to find vision - return error', async () => {
      const vision = await findVision.findVision();

      expect(findStub).to.have.not.been.called;
      expect(loggerStub).to.have.not.been.called;
      expect(vision.statusCode).to.equal(500);
      expect(vision.message).to.equal('No organization id was provided');
    });
  });

  context('Test DB Error', () => {
    it('Should fail to find vision & return empty vision', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').throws(new AppError('Find opp failed', 400));

      findVision.__set__('find', stubFind);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(vision).to.have.property('vision', '');
      expect(vision).to.have.property('orgID', 'kalakuta');
    });
  });

  context('Test Null Data', () => {
    it('Should fail to find vision & return empty vision', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: null } });

      findVision.__set__('find', stubFind);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(vision).to.have.property('vision', '');
      expect(vision).to.have.property('orgID', 'kalakuta');
    });

    it('Should fail to find vision due to other error', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').throws(new AppError('Some random error', 500));

      findVision.__set__('find', stubFind);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'Some random error');
    });
  });

  context('Test Complete Success', () => {
    it('Should find valid vision successfully', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Always Strive And Prosper' } } });

      findVision.__set__('find', stubFind);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(vision).to.have.property('orgID', 'kalakuta');
      expect(vision).to.have.property('vision', 'Always Strive And Prosper');
    });
  });
});
