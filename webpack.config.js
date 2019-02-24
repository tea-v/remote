/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv').config();
const path = require('path');
const serverlessWebpack = require('serverless-webpack');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

if (dotenv.error) {
  throw dotenv.error;
}

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
        test: /\.(js|ts)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/typescript'],
            ['env', { targets: { node: '8.10' } }],
          ],
        },
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  plugins: [new webpack.DefinePlugin()],
  resolve: {
    alias: {
      ':clients': path.resolve(__dirname, './clients'),
      ':functions': path.resolve(__dirname, './functions'),
      ':graphql': path.resolve(__dirname, './graphql'),
      ':types': path.resolve(__dirname, './types'),
    },
    extensions: ['.graphql', '.js', '.ts'],
  },
  stats: 'minimal',
  target: 'node',
};
