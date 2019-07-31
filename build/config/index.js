/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 配置相关代理等
 * @Date: 2019-07-29 14:15:37
 * @LastEditTime: 2019-07-29 15:02:26
 */

module.exports = {
  proxy: {
    '/api': {
      target: 'http://localhost:9000/'
    }
  },
  port: 8000
}
