import { defineBoot } from '#q-app/wrappers'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import { io } from 'socket.io-client'

// Setup the Feathers client
const socket = io(process.env.API_URL, {
  path: process.env.API_PATH + '/socket.io/',
  // throw errors if the server doesn't respond in time
  // Cloud Run cold start can take a while, so we set this to 30s
  ackTimeout: 30000,
})
const client = feathers()
// Set up Socket.io client with the socket
client.configure(socketio(socket))

const pfam = client.service('pfam')
const references = client.service('references')

export default defineBoot(({ app }) => {
  app.config.globalProperties.$client = client
  app.config.globalProperties.$pfam = pfam
  app.config.globalProperties.$references = references
})

export { client, pfam, references }
