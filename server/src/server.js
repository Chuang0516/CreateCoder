const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(expressSession)
// const { redisConfig } = require('./config/config')

// 创建Redis连接配置
const redisClient = redis.createClient()
redisClient.on('connect', function () {
  console.log('Redis client connected')
})
redisClient.on('error', function (e) {
  console.error(e)
})

class CloudbaseRunServer {
  constructor() {
    this.server = express()
    // bodyParser配置，处理Post请求的数据
    this.server.use(bodyParser.urlencoded({ extended: false, limit: '5120kb' }))
    this.server.use(bodyParser.json({ limit: '5120kb' }))
    this.server.set('x-powered-by', false)
    this.server.all('*', (req, res, next) => {
      // 允许跨域的地址
      res.setHeader('Access-Control-Allow-Origin', '*')
      // 允许跨域请求的方法
      res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, DELETE, PUT'
      )
      // 允许跨域请求 header 携带哪些东西
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
      )
      next()
    })
    // 设置 Express 的 Session 存储中间件
    this.server.use(
      expressSession({
        store: new RedisStore({
          client: redisClient,
        }), // 设置这个就可存储到 redis
        name: 'session_id', // 默认connect.sid
        secret: 'CreateCoder', // 签名密钥
        resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
        saveUninitialized: true, // 如果没有session那么就设置，否则不设置(推荐true)
        rolling: true, // 每次请求更新有效时长
        cookie: {
          // 全局设置cookie，请求任意api就会设置cookie，也可以在登录的路由下单独设置
          maxAge: 1000 * 60 * 60 * 24 * 15, // 15 天后过期
          httpOnly: true, // 是否允许客户端修改cookie，默认true，不能被修改
        },
      })
    )
  }

  // 请求处理方法：传入请求路径以及请求回调函数
  setRoute(path, requestFunction) {
    const handler = async (req, res) => {
      const event = req.body
      const result = await requestFunction(event, req, res)
      res.send(result)
    }
    this.server.post('/api' + path, handler)
  }

  // 监听端口
  listen(port) {
    this.server.listen(port)
    console.log(`port ${port} is running...`)
  }
}

module.exports.CloudbaseRunServer = CloudbaseRunServer
