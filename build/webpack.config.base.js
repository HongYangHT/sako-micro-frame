const { resolve } = require('path')
const webpack = require('webpack')
const VueConfig = require('./webpack.config.vue')
const merge = require('webpack-merge')
const devMode = process.env.NODE_ENV !== 'production'
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(
  {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'inline-source-map' : 'source-map',
    module: {
      rules: [
        // ... 其它规则
        {
          enforce: 'pre',
          test: /\.(js|vue|jsx)$/,
          exclude: /node_modules/,
          include: [resolve(__dirname, '/example/**'), resolve(__dirname, '/src/**')],
          loader: 'eslint-loader',
          options: {
            fix: true,
            formatter: require('eslint-friendly-formatter')
          }
        },
        { test: /iview.*?js$/, loader: 'babel-loader' }
      ]
    },
    resolve: {
      modules: [resolve('node_modules'), resolve('src')],
      extensions: ['.js', '.vue', '.jsx', '.json', '.css', '.scss', '.sass'],
      alias: {
        '@': resolve(__dirname, '../src'),
        vue$: devMode ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js',
        iview: 'iview'
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
      }),
      new CopyPlugin([
        {
          from: 'static/**/*',
          to: './'
        }
      ])
    ]
  },
  VueConfig
)
