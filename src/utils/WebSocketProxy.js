export class WebSocketProxy {
  constructor(path) {
    this.baseUrl = 'wss://createcoder-prod-0gpj2cowbfa22bef-1307039145.ap-shanghai.run.wxcloudrun.com/ws' // 服务器路径
    this.url = `${this.baseUrl}${path}` // 服务器路径
    this.socket = undefined // 连接实例
    this.messages = [] // 收到的消息列表
  }
  create(data) {
    console.log('链接')
    if (!WebSocket) {
      console.warn('你的浏览器不支持WS链接')
      return
    }
    // 检查是否已经有示例存在
    if (this.socket) {
      console.log('已经建立链接')
      return
    }

    let params = ''
    for (let key in data) {
      const val = data[key]
      params += `${key}=${val}&`
    }

    params = '?' + params.slice(0, -1)

    try {
      this.socket = new WebSocket(`${this.url}${params}`)
      const self = this
      // 连接开启
      this.socket.onopen = function (e) { }
      // 连接错误
      this.socket.onerror = function (e) {
        self.close()
      }
    } catch (err) {
      console.log(err)
      this.close()
    }
  }

  send(msg) {
    if (!this.socket) {
      this.log('尚未连接WS')
      return
    }
    this.socket.send(msg) // 透过实例发送消息
    // 透过实例发送消息
  }
  close() {
    if (!this.socket) {
      this.log('尚未连接WS')
      return
    }
    this.socket.close() // 关闭连接
    this.socket = undefined // 清空当前实例
    this.log('已断开WS连接')
  }
  log(msg) {
    const prefix = '[WebSocketProxy]'
    console.log(`${prefix}${msg}`)
  }
}
