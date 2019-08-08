### 使用方式
- 开发模式
> npm run dev, 支持热更新、样式模块化、懒加载

- 打包
> npm run build

- 分析代码结构
> npm run analyzer

### git tag 的使用方法
- git tag -a v1.0 -m 'tag v1.0'
- npm version patch
- git push origin v1.0

### 使用frame方法

> frame 组件的API、props、事件 

- 1.props
  - 1.logo 左上角logo
  - 2.logoMin 左上角logo缩略图
  - 3.logoRouter 左上角logo路由
  - 4.instance 传入的请求实例
  - 5.singleSpa 微前端single-spa的实例
  - 6.functionTree 导航
  - 7.subList 二级菜单
  - 8.loginInfo 登录信息
  - 9.token 登录token

- 2.事件
  - 1.on-frame-logout(loginInfo) 登出事件， 参数：登入的信息
  - 2.on-frame-desktop-item(item) 我的工作台， 参数：点击的那条信息参数
  - 3.on-frame-notice-item(item) 消息中心，参数：点击的那条消息参数
  - 4.on-frame-change-password(loginInfo) 修改密码按钮 参数： 登录信息
  - 5.on-frame-change-oparator(oparatorId) 修改机构信息 参数： 机构id
  - 6.on-frame-set-customized-menu 点击自定义菜单，去往自定义菜单 参数：无
  - 7.on-frame-customized-menu(item) 点击自定义菜单的某一条菜单 参数：菜单参数
  - 8.on-frame-top-menu-select({ functionName, item }) 顶部导航 参数：菜单名，菜单相关信息
  - 9.on-frame-left-menu-select({ functionName, item }) 左侧导航 参数：菜单名，菜单相关信息

```js
import { Frame } from 'sako-micro-frame' // 引出frame模块
import '../../lib/css/main.css' // 引入公共样式

export default {
  components: {
    [Frame.name]: Frame //注册组件
  }
}
// 使用组件
<template>
  <sako-frame
    :function-tree="functionTree"
    :sub-list="subList"
    :single-spa="singleSpa"
    :login-info="loginInfo"
    :instance="instance"
    :token="token"
  ></sako-frame>
</template>
```
