// const { resolve } = require('path')
module.exports = [
  // 它会应用到普通的 `.js` 文件
  // 以及 `.vue` 文件中的 `<script>` 块
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader'
      }
    ]
  }
]
