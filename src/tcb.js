import tcb from '@cloudbase/js-sdk'

const env = 'cloudbase-baas-4g1a5g4h6dc9d130'

const app = tcb.init({ env })

const auth = app.auth({
  persistence: 'local',
})

export { app, auth }
