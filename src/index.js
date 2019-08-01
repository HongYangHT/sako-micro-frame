/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 公共组件出口,包含拦截器，路由，及登录相关信息存储
 * @Date: 2019-07-29 13:46:39
 * @LastEditTime: 2019-07-31 18:42:12
 */
import * as http from './http'
import router from './router'
import store from './store'
import route from './route'
import * as locals from './locals'
import Frame from './frame'
const root = { http, router, store, route, locals, Frame }
export default root
