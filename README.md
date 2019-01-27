# annotate-ui
Protein Annotation using Recurrent Neural Network Models

# Ports used

* 8501 - TF Serving API
* 8583 - Quasar UI
* 8581 - Feathers API

# Setup server pm2
npm i -g pm2
npm i -g spa-http-server

cd annotate-api
NODE_ENV=production pm2 start npm --name annotate-api -- run start

cd ../annotate-ui
NODE_ENV=production pm2 start npm --name annotate-ui -- run start
NODE_ENV=production pm2 start /usr/bin/http-server --name annotate-ui -- ./dist/pwa-mat --push-state -c 60 -p 8583 -d false

pm2 save
