const { CloudbaseRunServer } = require('./server')

const server = new CloudbaseRunServer()

server.setRoute('/onlogin', require('./service/onLogin/index.js').main)
server.setRoute('/getcaptcha', require('./service/getCaptcha/index.js').main)
server.setRoute('/mpinit', require('./service/mpInit/index.js').main)

server.listen(3000)
