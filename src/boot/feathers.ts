import { defineBoot } from '#q-app/wrappers'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// Setup the Feathers client
const socket = io(process.env.API_URL, {
  path: process.env.API_PATH + '/socket.io/',
})
const client = feathers()
const pfam = client.service('pfam')
const references = client.service('references')

// Set up Socket.io client with the socket
client.configure(socketio(socket, { timeout: 10000 }))

export default defineBoot(({ app }) => {
  app.config.globalProperties.$client = client
  app.config.globalProperties.$pfam = pfam
  app.config.globalProperties.$references = references
})

export { client, pfam, references }
