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
const mockNotif = require('./sampleNotification.json');

// Attach getter & setter methods to notification service module
const getNotifs = rewire('../../../services/notification.service.js');

chai.use(sinonChai);

// Spin up sinon sandbox
const sandbox = sinon.createSandbox();

describe('GET NOTIFICATIONS TESTS (UNIT)', () => {
  // Disable logger messages
  const loggerStub = sinon.stub(logger, 'info').returns('');
  getNotifs.__set__('logger', { info: loggerStub });

  // Restore sandbox after each context block
  afterEach(() => {
    sandbox.restore();
  });

  // Restore sinon after all tests are complete
  after(() => {
    sandbox.restore();
    sinon.restore();
  });

  context('Test Invalid Query Params', () => {
    it('Should fail to find notifications - Invalid orgID', async () => {
      const notifs = await getNotifs.sendNotification(null, 'sample userID');

      expect(notifs).to.be.an('error');
      expect(notifs.status).to.equal('fail');
      expect(notifs.statusCode).to.equal(403);
      expect(notifs.message).to.equal('org_id is required');
    });

    it('Should fail to find notifications - Invalid userID', async () => {
      const notifs = await getNotifs.sendNotification('sample orgID', null);

      expect(notifs).to.be.an('error');
      expect(notifs.status).to.equal('fail');
      expect(notifs.statusCode).to.equal(403);
      expect(notifs.message).to.equal('user_id is required');
    });
  });

  context('Test db Error', () => {
    it('Should throw an error on db.find()', async () => {
      const stubFind = sandbox.stub(dbh, 'find').throws(new AppError('Unexpected Error', 500));

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID');

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('error');
      expect(notifs.status).to.equal('error');
      expect(notifs.statusCode).to.equal(500);
      expect(notifs.message).to.equal('Unexpected Error');
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });
  });

  context('Test Empty & Non-Empty Notifications Collection', () => {
    it('Should return an empty notifications array', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: [] } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID');

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });

    it('Should return a populated notifications array', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: mockNotif } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID');

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(notifs.data).to.deep.equal(mockNotif);
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });
  });

  context('Test Pagination And Offset', () => {
    it('Should return a notifications array (page:1, offset:3)', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: mockNotif } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const page = 1;
      const limit = 3;
      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID', page, limit);

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(notifs.data).to.have.length(3);
      expect(notifs.data).to.deep.equal(mockNotif.slice(page - 1, limit));
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });

    it('Should return an empty notifications array (page:10, offset:3)', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: mockNotif } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const page = 10;
      const limit = 3;
      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID', page, limit);

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(notifs.data).to.have.length(0);
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });

    it('Should return the full notifications array (page:0, offset:3)', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: mockNotif } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const page = 0;
      const limit = 3;
      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID', page, limit);

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(notifs.data).to.have.length(6);
      expect(notifs.data).to.deep.equal(mockNotif);
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });

    it('Should return the full notifications array (page:3, offset:0)', async () => {
      const stubFind = sandbox.stub(dbh, 'find').resolves({ data: { data: mockNotif } });

      // Replace db.find() method with stub
      getNotifs.__set__('find', stubFind);

      const page = 3;
      const limit = 0;
      const notifs = await getNotifs.sendNotification('sample orgID', 'sample userID', page, limit);

      expect(stubFind).to.have.been.calledOnce;
      expect(notifs).to.be.an('object');
      expect(notifs).to.have.property('data');
      expect(notifs.data).to.be.an('array');
      expect(notifs.data).to.have.length(6);
      expect(notifs.data).to.deep.equal(mockNotif);
      expect(stubFind).to.have.been.calledWith('goalNotifications');
    });
  });

  // Cleanup
  sinon.restore();
  sandbox.restore();
});
