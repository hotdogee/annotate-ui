// Bring in the imports from the feathers-client.js file.
import feathersClient, { makeServicePlugin, BaseModel } from '../feathers-client'

// Extend the base class
class Reference extends BaseModel {
  static modelName = 'Reference'
  static instanceDefaults () {
    return {
      _id: '',
      seqAcc: '',
      refName: '',
      pfamAcc: '',
      start: null,
      end: null
    }
  }
}
const servicePath = 'references'
const servicePlugin = makeServicePlugin({
  Model: Reference,
  service: feathersClient.api.service(servicePath),
  servicePath
})

// Optionally add service-level hooks, here:
feathersClient.api.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
