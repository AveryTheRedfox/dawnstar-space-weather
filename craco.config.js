const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        }),
      ],
    },
    configure: {
      resolve: {
        fallback: {
          vm: false, // Prevents browser compilation errors for node:vm
        },
      },
    },
  },
};