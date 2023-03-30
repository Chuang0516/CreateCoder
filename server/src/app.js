const tcb = require('@cloudbase/node-sdk')

const app = tcb.init({
  env: 'cloudbase-baas-4g1a5g4h6dc9d130',
  secretId: 'AKID4ygGdmdFdnlX4PWP3Yq33pNhohMmxugD',
  secretKey: 'c094lESSIvJTOL7g2B8sPjqiU4QXR6bu',
})

module.exports = app
