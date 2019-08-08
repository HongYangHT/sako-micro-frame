### sako-micro-frame
> 用于处理公共区域模块，并将其以组件注入的方式注入

### 项目目录
```
+-- build  // 打包文件配置
|----- 相关的webpack配置文件
+-- example // 本地测试目录
|----- 本地测试的vue工程
+-- lib // 打包后文件
|  +-- css 打包样式
|  +-- static 未经过编译的文件
|  +-- app.js
+-- node_modules // 依赖包
+-- src // 源码
|  +-- components // 公共组件
|  +-- frame // 外层框架
|  +-- http // 服务请求的公共代码
|  +-- locals // 国际化
|  +-- route // 公共页面路由
|  +-- router // 公共路由方法
|  +-- store // 公共数据
|  +-- utils // 功能函数
|  +-- views // 公共页面
|  +-- index.js // 入口文件
|-- static // 免于打包编译
+-- .babelrc // babel配置
+-- .browserslistrc // postcss配置
+-- .editorconfig // 统一格式配置
+-- .eslintignore // eslint ignore
+-- .eslintrc.js // eslint 配置
+-- .gitignore // git ignore
+-- .npmrc // 发包删除文件
+-- .stylelintignore // stylelint ignore
+-- .stylelintrc.js // stylelint 配置
+-- ChANGE.md // 更新日志
+-- package.json
+-- README.md // 文档
+-- USEAGE.md // 使用文档
```

### 用法 
- 1.下载依赖包到本地工程 
> npm i sako-micro-frame -S

- 2.具体用法参照[文档](/USEAGE.md)

### 开发方法
> 组件开发，然后在入口中抛出
