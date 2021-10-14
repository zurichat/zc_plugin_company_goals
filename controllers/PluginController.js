const {
  installPluginControl,
  verifyTokenAndVerifyMemberID,
  uninstallPluginControl,
} = require('../services/plugin.service');
const catchAsync = require('../utils/catchAsync');

const installPlugin = async (req, res, next) => {
  const { organization_id: orgID, user_id: memberID } = req.body;
  const AuthStr = req.header('Authorization');

  try {
    const confirmVerification = await verifyTokenAndVerifyMemberID(orgID, memberID, AuthStr);
    if (confirmVerification !== 'validation success')
      return res.status(403).send({ message: 'Access denied', success: 'false', data: null });
    if (confirmVerification instanceof Error) throw confirmVerification;
    const response = await installPluginControl(orgID, memberID, AuthStr);
    if (response instanceof Error) throw response;

    if (response.data) {
      const {
        data: { message },
      } = response;
      if (response.data.status !== 200)
        return res.status(response.data.status).send({ message, success: 'false', data: null });
    }

    return res.status(200).send({
      message: `InsertedID: ${response.InsertedID}`,
      success: 'true',
      data: {
        redirect_url: `https://zuri.chat/goals/room/${orgID}`,
      },
    });
  } catch (error) {
    next(error);
    if (error.isOperational)
      return res.status(error.statusCode).send({ status: error.statusCode, message: error.status });
    if (error.isAxiosError) {
      const { message } = error.response.data;
      return res.status(400).send({ message, success: false, data: null });
    }
    res.status(500).json({
      message: `Something unexpected occured`,
      error,
      success: false,
      data: null,
    });
  }
};

const uninstallPlugin = async (req, res, next) => {
  const { organization_id: orgID, user_id: memberID } = req.body;
  const AuthStr = req.header('Authorization');

  try {
    const confirmVerification = await verifyTokenAndVerifyMemberID(orgID, memberID, AuthStr);
    if (confirmVerification !== 'validation success')
      return res.status(403).send({ message: 'Access denied', success: 'false', data: null });
    if (confirmVerification instanceof Error) throw confirmVerification;
    const response = await uninstallPluginControl(orgID, memberID, AuthStr);
    if (response instanceof Error) throw response;
    const { message } = response;
    if (response.status !== 200) return res.status(response.status).send({ message, success: 'false', data: null });

    return res.status(200).send({
      message: `DeletedCount: ${response.data.DeletedCount}`,
      success: 'true',
      data: {
        redirect_url: `https://zuri.chat/goals/room/${orgID}`,
      },
    });
  } catch (error) {
    if (error.isOperational) next(error);
    if (error.isAxiosError) {
      const { message } = error.response.data;
      return res.status(400).send({ message, success: false, data: null });
    }
  }
};

exports.installPlugin = catchAsync(installPlugin);
exports.uninstallPlugin = catchAsync(uninstallPlugin);
