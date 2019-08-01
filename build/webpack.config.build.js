const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('path')
const BaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const smp = new SpeedMeasurePlugin()

const config = merge(BaseConfig, {
  mode: 'production',
  entry: './src',
  output: {
    path: resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    libraryTarget: 'umd',
    filename: 'app.js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true,
    globalObject: 'this',
    library: 'app'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'vue-router': {
      root: 'vue-router',
      commonjs: 'vue-router',
      commonjs2: 'vue-router',
      amd: 'vue-router'
    },
    vuex: {
      root: 'vuex',
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex'
    },
    iview: {
      root: 'iview',
      commonjs: 'iview',
      commonjs2: 'iview',
      amd: 'iview'
    },
    axios: {
      root: 'axios',
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios'
    }
  },
  optimization: {
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        commonStyle: {
          name: 'commonStyle',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // 压缩css
      // new UglifyJsPlugin({
      //   // 有很多可以配置
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      //   uglifyOptions: {
      //     // 在UglifyJs删除没有用到的代码时不输出警告
      //     warnings: false,
      //     output: {
      //       // 删除所有的注释
      //       comments: false,
      //       // 最紧凑的输出
      //       beautify: false
      //     },
      //     compress: {
      //       // 删除所有的 `console` 语句
      //       // 还可以兼容ie浏览器
      //       drop_console: true,
      //       // 内嵌定义了但是只用到一次的变量
      //       collapse_vars: true,
      //       // 提取出出现多次但是没有定义成变量去引用的静态值
      //       reduce_vars: true
      //     }
      //   }
      // })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
      verbose: true,
      dry: false
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,
      cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
      cssProcessorOptions: {
        map: {
          // 不生成内联映射,这样配置就会生成一个source-map文件
          inline: false,
          // 向css文件添加source-map路径注释
          // 如果没有此项压缩后的css会去除source-map路径注释
          annotation: true
        },
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        safe: true,
        // cssnano 集成了autoprefixer的功能
        // 会使用到autoprefixer进行无关前缀的清理
        // 关闭autoprefixer功能
        // 使用postcss的autoprefixer功能
        autoprefixer: false
      },
      canPrint: true // 是否将插件信息打印到控制台
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      // NOTE: 设置生成`gzip`文件大小 100K
      threshold: 100 * 1024,
      minRatio: 0.8,
      cache: true
    })
  ]
})

module.exports = smp.wrap(config)
