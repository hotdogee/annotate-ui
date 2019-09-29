// Bring in the imports from the feathers-client.js file.
import feathersClient, { makeServicePlugin, BaseModel } from '../feathers-client'

// Extend the base class
class Pfam extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }
  static modelName = 'Pfam'
  static instanceDefaults () {
    return {
      _id: '',
      domainMap: {},
      header: '',
      predictions: [
        {
          classes: [],
          top_classes: [],
          top_probs: []
        }
      ],
      seq: ''
    }
  }
  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}
const servicePath = 'pfam'
const servicePlugin = makeServicePlugin({
  Model: Pfam,
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
