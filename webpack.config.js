import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'

import { spawn } from 'child_process'
import { resolve, join } from 'path'

export const INPUT = resolve('src')
export const OUTPUT = resolve('dist')

/** @type {import('webpack').Configuration} */
export const config = {
  devtool: process.env.SOURCEMAP === 'true' && 'source-map',
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    port: 'auto',
    hot: true,
    liveReload: true,
    onListening: (devServer) => {
      const address = devServer.server?.address() || null
      if (address === null || typeof address === 'string') {
        return
      }
      spawn('start', [join(INPUT, 'renderer/Main.ahk')], {
        env: {
          DEV_SERVER: 'true',
          DEV_SERVER_PORT: address.port.toString(),
        },
        detached: true,
        stdio: 'ignore',
        shell: true,
      }).unref()
    },
  },
  entry: {
    index: join(INPUT, 'main/index.tsx'),
  },
  output: {
    clean: true,
    filename: 'main/js/[name].js',
    path: OUTPUT,
  },
  resolve: {
    alias: {
      '@assets': resolve('./src/assets'),
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      react: 'preact/compat',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  mode: 'production',
  target: ['browserslist'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  runtime: 'automatic',
                  importSource: 'preact',
                },
              ],
            ],
            sourceType: 'unambiguous',
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          mangle: true,
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: INPUT,
          from: 'renderer',
          to: 'renderer',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'main/index.html',
      template: join(INPUT, 'main/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'main/styles/[name].css' }),
  ],
}

export default config
