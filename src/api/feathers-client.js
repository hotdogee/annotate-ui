import feathers from '@feathersjs/client'
import io from 'socket.io-client'
const socket = io(process.env.API_URL, {
  path: process.env.API_PATH,
  transports: ['websocket']
})
const feathersClient = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({ storage: window.localStorage }))
export default feathersClient
