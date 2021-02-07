const Mock = require('mockjs')
const util = require('./util')

module.exports = function (app) {

  // 登录
  app.post('/dev/frontLogin', (rep, res) => {
    const articleList = util.getJsonFile('./data/login.json')
    res.json(Mock.mock(articleList))
  })

  // 用户id
  app.get('/dev/frontGetInfo', (rep, res) => {
    const articleList = util.getJsonFile('./data/userId.json')
    res.json(Mock.mock(articleList))
  })

  // 用户信息
  app.get('/dev/system/front/11111', (rep, res) => {
    const articleList = util.getJsonFile('./data/getInfo.json')
    res.json(Mock.mock(articleList))
  })

  // 注册
  app.post('/dev/frontReg', (rep, res) => {
    const articleList = util.getJsonFile('./data/register.json')
    res.json(Mock.mock(articleList))
  })

}
