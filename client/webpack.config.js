const { merge } = require('webpack-merge');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'zuri',
    projectName: 'company-goals',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [new NodePolyfillPlugin()],
  });
};
