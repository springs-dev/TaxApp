const path = require('path')
const webpack = require('webpack')
// If file is less than 10KB, turn it into dataURI
// else, use the raw asset and save it to a separate folder.
const embedFileSize = 10000

const assetsLoaders = [{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}, {
  test: /\.styl$/,
  use: [
    { loader: 'style-loader', options: { sourceMap: false } },
    { loader: 'css-loader', options: { sourceMap: false } },
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [require('autoprefixer')]
        },
        sourceMap: false
      }
    },
    { loader: 'stylus-loader', options: { sourceMap: false } }
  ]
}, {
  test: /\.(ttf|woff|woff2)$/,
  use: 'url-loader'
}, {
  test: /\.json$/,
  use: 'json-loader'
}, {
  test: /\.(jpe?g|png|gif|svg)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: embedFileSize,
      name: 'img/[name].[sha1:hash:base64:7].[ext]'
    }
  }]
}]

const babelLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
}

const lintLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  enforce: 'pre',
  loader: 'eslint-loader'
}

module.exports = {
  devtool: 'cheap-hidden-source-map',
  entry: [
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: 'http://dev.jamax.ba/taxappeal/'
  },
  resolve: {
    extensions: ['*', '.js', '.styl', '.css']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: false,
      sourceMap: true,
      compress: {
        warnings: false,
        pure_getters: true,
        screw_ie8: true,
        comparisons: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      ...assetsLoaders,
      babelLoader
      // lintLoader
    ]
  },
  stats: {
    chunkModules: false,
    errors: true,
    colors: true
  },
  // Hide log for assets exceeding the recommended limit of 250 kB
  performance: {
    hints: false
  }
}
