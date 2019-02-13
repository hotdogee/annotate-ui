# annotate-ui
Protein Annotation using Recurrent Neural Network Models

# Development

## annotate-api
```bash
cd annotate-api
npm run dev
```
starts feathers api on http://localhost:8581

## annotate-ui
```bash
cd annotate-ui
npm run dev
```
starts quasar ui on http://localhost:8080

```bash
npm run build
```

# Ports used

* 8501 - TF Serving API
* 8583 - Quasar UI
* 8581 - Feathers API

# Setup server
```bash
npm i -g pm2
npm i -g spa-http-server

cd annotate-api
NODE_ENV=production sudo pm2 start npm --name annotate-api -- run start

cd ../annotate-ui
NODE_ENV=production sudo pm2 start npm --name annotate-ui -- run start
NODE_ENV=production sudo pm2 start /usr/bin/http-server --name annotate-ui -- ./dist/pwa-mat -c-1 -p 8583 -d false

pm2 save
```

# start tensorflow serving
```bash
IP: 192.168.1.63

docker run --runtime=nvidia -p 8501:8501 --mount type=bind,source=/home/hotdogee/export,target=/models/pfam -e MODEL_NAME=pfam -t tensorflow/serving:latest-gpu
```

# nginx conf
```
server {
    listen      80;
    listen      [::]:80;
    listen      443 ssl http2;
    listen      [::]:443 ssl http2;

    server_name ann.hanl.in;
    client_max_body_size 0;

    ssl_certificate /etc/nginx/ssl/hanl.in/hanl.in.crt;
    ssl_certificate_key /etc/nginx/ssl/hanl.in/hanl.in.key;
    ssl_trusted_certificate /etc/nginx/ssl/hanl.in/ggssl_trusted.crt;

    location /api {
        return 302 /api/;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8581/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    location /v100 {
        return 302 /v100/;
    }

    location /v100/ {
        proxy_pass http://192.168.1.63:8501/v1/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    location / {
        proxy_pass http://127.0.0.1:8583;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```