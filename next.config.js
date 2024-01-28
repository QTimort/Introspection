const webpack = require('webpack');

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, w }
  ) => {
    // Important: return the modified config
    config.plugins = [
      ...config.plugins,
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ]
    return config
  },
}
