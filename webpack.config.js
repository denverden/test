const path = require('path');
const autoprefixer = require('autoprefixer');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      favicon: "./favicon.ico",
      filename: 'index.html',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, 'src/assets/day/'),
          to: path.resolve(__dirname, 'dist/assets/day'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/evening/'),
          to: path.resolve(__dirname, 'dist/assets/evening'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/morning/'),
          to: path.resolve(__dirname, 'dist/assets/morning'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/night/'),
          to: path.resolve(__dirname, 'dist/assets/night'),
        },
      ],
    ),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [autoprefixer()] },
          },
          'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: isDev ? '[path][name].[ext]' : '[path][name].[hash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
          'eslint-loader',
        ],
      },
    ],
  },
};
