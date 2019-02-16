/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const serverlessWebpack = require('serverless-webpack');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: serverlessWebpack.lib.entries,
  externals: [webpackNodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.graphql$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [['env', { targets: { node: '8.10' } }]],
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  resolve: {
    alias: {
      ':clients': path.resolve(__dirname, './clients'),
    },
    extensions: ['.graphql', '.js', '.ts'],
  },
  stats: 'minimal',
  target: 'node',
};
