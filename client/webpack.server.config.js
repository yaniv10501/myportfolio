const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './tools/ssgBuild.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, './build/server'),
    filename: 'bundle.js',
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|webm)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[contenthash][ext]',
        },
      },
      { test: /\.svg/, exclude: /node_modules/, type: 'asset/inline' },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
