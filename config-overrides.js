
const {
    addWebpackPlugin,
    addWebpackAlias,
    addWebpackModuleRule,
    override } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = override(
  addWebpackAlias({
    three$: path.resolve('./src/utils/three.ts'),
    '../../../build/three.module.js': path.resolve('./src/utils/three.ts'),
  }),
  addReactRefresh({ disableRefreshCheck: true }),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackModuleRule(
    {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
      ]
    }
  ),
);
