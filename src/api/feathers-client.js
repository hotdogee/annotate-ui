import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import feathersVuex from 'feathers-vuex'
import auth, { AuthenticationClient } from '@feathersjs/authentication-client'
// import Logger from 'assets/logger'
// const logger = new Logger('feathers-client')

// Setup the Feathers client
const socket = io(process.env.API_URL, {
  path: process.env.API_PATH + '/socket.io'
})
const feathersClient = {
  api: feathers()
    .configure(socketio(socket, { timeout: 10000 }))
    .configure(
      auth({
        header: 'Authorization',
        scheme: 'Bearer',
        storageKey: 'feathers-jwt',
        locationKey: 'access_token',
        locationErrorKey: 'error',
        jwtStrategy: 'jwt',
        path: '/authentication',
        Authentication: AuthenticationClient,
        storage: window.localStorage
      })
    )
}
export default feathersClient

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient.api, {
  serverAlias: 'api', // or whatever that makes sense for your project
  idField: '_id' // `id` and `_id` are both supported, so this is only necessary if you're using something else.
})

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, clients, FeathersVuex }
