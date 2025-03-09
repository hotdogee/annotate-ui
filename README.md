# ANNotate (annotate-ui)

Protein Function Prediction using Recurrent Neural Networks

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# Implementation Notes

## 2025/3/7

- I decided not to use `feathers-pinia` because it still requires the old version of pinia (v2), and hasn't been updated in 10 months, seems abandoned.

```bash
npm install @feathersjs/socketio-client socket.io-client --save
```

## 2025/3/8

- v-charts hasn't been updated in 6 years, need to move to something modern
- removed v-charts, and moved to @v-charts2/histogram

```bash
npm install @v-charts2/histogram
```

## 2025/3/9

- Use pinia-colada to handle api caching

## 2025/3/10

- Use pinia-plugin-persistedstate to persist the query cache
  - doesn't work
- Use native localStorage api to cache api responses instead
