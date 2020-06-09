const withSass = require('@zeit/next-sass')

module.exports = withSass({
  target: 'serverless',
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    return config;
  }
})