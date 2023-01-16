const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: false,
  output: {
    filename: 'static/js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.s?css$/,
        exclude: /node_modules/,
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      inject: true,
      publicPath: '/',
      minify: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'static/css/[name].[contenthash].css',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: path.resolve(__dirname, 'src/images'),
        //   to: path.resolve(__dirname, 'build/static/media'),
        // },
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build'),
          filter: (resourcePath) =>
            resourcePath !== path.resolve(__dirname, 'public', 'index.html'),
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all', // both : consider sync + async chunks for evaluation
          name: 'vendor', // name of chunk file
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
        recharts: {
          chunks: 'all', // both : consider sync + async chunks for evaluation
          name: 'recharts', // name of chunk file
          test: /[\\/]node_modules[\\/](recharts)[\\/]/,
        },
      },
    },
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
