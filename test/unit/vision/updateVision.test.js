/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const chai = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const centrifugo = require('../../../controllers/centrifugoController');
const notifs = require('../../../controllers/notificationController');
const dbh = require('../../../db/databaseHelper');
const AppError = require('../../../utils/appError');
const logger = require('../../../utils/logger');

const findVision = rewire('../../../services/visionService.js');

chai.use(sinonChai);

const sandbox = sinon.createSandbox();

describe('UPDATE VISION TESTS', () => {
  let loggerStub;
  let findStub;
  let insertStub;

  beforeEach(() => {
    // Disable logger messages
    loggerStub = sandbox.stub(logger, 'info').returns('');
    findStub = sandbox.stub(dbh, 'find');
    insertStub = sandbox.stub(dbh, 'insertOne');
  });

  // Refresh sandbox for each test
  afterEach(() => {
    sandbox.restore();
  });

  context('Test Invalid orgID', () => {
    it('Should fail to find vision - return error', async () => {
      const vision = await findVision.insertVision(null, 'random vision');

      expect(findStub).to.have.not.been.called;
      expect(insertStub).to.have.not.been.called;
      expect(vision.statusCode).to.equal(500);
      expect(vision.message).to.equal('No organization id was provided');
    });
  });

  context('Test Invalid Vision', () => {
    it('Should fail to find vision - return error', async () => {
      const vision = await findVision.insertVision('random orgid', null);

      expect(findStub).to.have.not.been.called;
      expect(insertStub).to.have.not.been.called;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'No vision was provided');
    });
  });

  context('Test DB Error', () => {
    it('Should throw an error on db.find()', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').throws(new AppError('E no dey go oo 🤲🏿', 500));

      findVision.__set__('find', customFind);

      const vision = await findVision.insertVision('random orgid', 'fucc shii up 🤘🏿');

      expect(customFind).to.have.been.calledOnce;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'E no dey go oo 🤲🏿');
    });

    it('Should throw an error on db.updateOne()', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Laugh now cry later 😁' } } });
      const customUpdate = sandbox.stub(dbh, 'updateOne').throws(new AppError('E don fail 🙆🏿‍♂️', 500));

      findVision.__set__('find', customFind);
      findVision.__set__('updateOne', customUpdate);

      const vision = await findVision.insertVision('orgid', 'test vision');

      expect(customFind).to.have.been.calledOnce;
      expect(customUpdate).to.have.been.calledOnce;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'E don fail 🙆🏿‍♂️');
    });
  });

  context('Test Return Null Vision', () => {
    it('Should return an empty vision', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: null } } });

      findVision.__set__('find', customFind);

      const vision = await findVision.insertVision('orgid', 'test vision');

      expect(loggerStub).to.have.not.been.called;
      expect(vision).to.have.property('status', 'fail');
      expect(vision).to.have.property('statusCode', 404);
      expect(vision).to.have.property('message', 'No vision exists for this organization');
    });
  });

  context('Test Publish && createNotification Fail', () => {
    it('Should throw an error on pulish()', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Laugh now cry later' } } });
      const customUpdate = sandbox.stub(dbh, 'updateOne').resolves({ data: { data: { modified_documents: 1 } } });
      const customPublish = sandbox.stub(centrifugo, 'publish').throws(new AppError('Failed to publish', 500));

      findVision.__set__('find', customFind);
      findVision.__set__('updateOne', customUpdate);
      findVision.__set__('publish', customPublish);

      const vision = await findVision.insertVision('orgid', 'test vision');

      expect(customFind).to.have.been.calledOnce;
      expect(customUpdate).to.have.been.calledOnce;
      expect(customPublish).to.have.been.calledOnce;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'Failed to publish');
    });

    it('Should throw an error on createNotification()', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Laugh now cry later' } } });
      const customUpdate = sandbox.stub(dbh, 'updateOne').resolves({ data: { data: { modified_documents: 1 } } });
      const customPublish = sandbox.stub(centrifugo, 'publish').resolves(true);
      const customNotif = sandbox
        .stub(notifs, 'createNotification')
        .throws(new AppError('Failed to create notif', 500));

      findVision.__set__('find', customFind);
      findVision.__set__('updateOne', customUpdate);
      findVision.__set__('publish', customPublish);
      findVision.__set__('createNotification', customNotif);

      const vision = await findVision.insertVision('orgid', 'test vision');

      expect(customFind).to.have.been.calledOnce;
      expect(customUpdate).to.have.been.calledOnce;
      expect(customNotif).to.have.been.calledOnce;
      expect(customPublish).to.have.been.calledOnce;
      expect(vision).to.have.property('status', 'error');
      expect(vision).to.have.property('statusCode', 500);
      expect(vision).to.have.property('message', 'Failed to create notif');
    });
  });

  context('Test Update Vision Success', () => {
    it('Should update vision successfully', async () => {
      sandbox.restore();

      const customFind = sandbox.stub(dbh, 'find').resolves({ data: { data: { vision: 'Laugh now cry later' } } });
      const customUpdate = sandbox.stub(dbh, 'updateOne').resolves({ data: { data: { modified_documents: 1 } } });
      const customPublish = sandbox.stub(centrifugo, 'publish').resolves(true);
      const customNotif = sandbox.stub(notifs, 'createNotification').resolves({});

      findVision.__set__('find', customFind);
      findVision.__set__('updateOne', customUpdate);
      findVision.__set__('publish', customPublish);
      findVision.__set__('createNotification', customNotif);

      const vision = await findVision.insertVision('orgid', 'At Long Last A$AP 🙌🏿');

      expect(customFind).to.have.been.calledOnce;
      expect(customUpdate).to.have.been.calledOnce;
      expect(customNotif).to.have.been.calledOnce;
      expect(customPublish).to.have.been.calledOnce;
      expect(vision).to.equal('At Long Last A$AP 🙌🏿');
    });
  });
});
