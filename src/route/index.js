/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 新增判断常见错误以及属于公共路由
 * @Date: 2019-07-29 14:12:15
 * @LastEditTime: 2019-07-30 17:47:46
 */

export default [
  {
    // 会匹配所有路径
    path: '/403/:lang',
    name: '403',
    component: () => import(/* webpackChunkName: "403" */ '../views/exception/403.vue')
  },
  {
    // 会匹配所有路径
    path: '/500/:lang',
    name: '500',
    component: () => import(/* webpackChunkName: "500" */ '../views/exception/500.vue')
  },
  {
    // 会匹配所有路径
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/exception/404.vue')
  }
]
