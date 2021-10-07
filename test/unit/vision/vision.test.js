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

const findVision = rewire('../../../services/vision');

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('VISION TESTS', () => {
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
    it('Should fail to find vision', async () => {
      const vision = await findVision.findVision();
      expect(findStub).to.have.not.been.called;
      expect(loggerStub).to.have.not.been.called;
      expect(vision).to.be.null;
    });
  });

  context('Test DB Error', () => {
    it('Should fail to find vision - resolve 400', async () => {
      sandbox.restore();

      const stub = sandbox.stub(dbh, 'find').throws(new AppError('fail', 400));

      findVision.__set__('find', stub);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stub).to.have.been.calledOnce;
      expect(vision).to.be.null;
    });

    it('Should fail to find vision - enter catch block', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').throws(new AppError('fail', 500));
      const stubInsert = sandbox.stub(dbh, 'insertOne');

      findVision.__set__('find', stubFind);
      findVision.__set__('insertOne', stubInsert);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(stubInsert).to.have.been.calledOnce;
      expect(vision).to.have.property('vision', '');
      expect(vision).to.have.property('orgID', 'kalakuta');
    });
  });

  context('Test Null Data', () => {
    it('Should fail to find vision - insert new vision', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: null } });
      const stubInsert = sandbox.stub(dbh, 'insertOne');

      findVision.__set__('find', stubFind);
      findVision.__set__('insertOne', stubInsert);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(stubInsert).to.have.been.calledOnce;
      expect(vision).to.have.property('vision', '');
      expect(vision).to.have.property('orgID', 'kalakuta');
    });
  });

  context('Test Complete Success', () => {
    it('Should find valid vision successfully', async () => {
      sandbox.restore();

      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Always Strive And Prosper' } } });
      const stubInsert = sandbox.stub(dbh, 'insertOne');

      findVision.__set__('find', stubFind);
      findVision.__set__('insertOne', stubInsert);

      const vision = await findVision.findVision('kalakuta');

      expect(loggerStub).to.have.not.been.called;
      expect(stubInsert).to.have.not.been.called;
      expect(stubFind).to.have.been.calledOnce;
      expect(vision).to.have.property('orgID', 'kalakuta');
      expect(vision).to.have.property('vision', 'Always Strive And Prosper');
    });
  });
});
