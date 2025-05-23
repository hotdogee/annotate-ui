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

- 8501 - TF Serving API
- 8583 - Quasar UI
- 8581 - Feathers API

# Setup server

```bash
npm i -g pm2
npm i -g spa-http-server

cd annotate-api
NODE_ENV=production sudo pm2 start npm --name annotate-api -- run start

cd ../annotate-ui
NODE_ENV=production sudo pm2 start npm --name annotate-ui -- run start
NODE_ENV=production sudo pm2 start /usr/bin/http-server --name annotate-ui -- ./dist/pwa-mat -c-1 -p 8583 -d false

sudo pm2 save
sudo pm2 startup
```

# tensorflow serving

## start

IP: 192.168.1.63

```bash
docker run --runtime=nvidia -e NVIDIA_VISIBLE_DEVICES=0 -p 8501:8501 --name serving_annotate --mount type=bind,source=/home/hotdogee/export,target=/models/pfam -e MODEL_NAME=pfam -t tensorflow/serving:latest-gpu
```

New

```bash
docker run --runtime=nvidia -e NVIDIA_VISIBLE_DEVICES=2 -p 8601:8501 --name serving_annotate2 --mount type=bind,source=/home/hotdogee/models,target=/models -t tensorflow/serving:latest-gpu --model_config_file=/models/models_config_ann.proto --file_system_poll_wait_seconds=60
```

```conf
model_config_list {
  config {
    name: 'pfam'
    base_path: '/models/ann/'
    model_platform: 'tensorflow'
  }
}
# Contains model:
#   BEST p32	m1	1568346315	FullGru512x4_hw512_TITANV_W2125-2.4	epoch-4-4421273
```

## stop

```bash
docker stop serving_annotate
```

# nginx routes

| location | proxy_pass                   |
| -------- | ---------------------------- |
| /        | http://127.0.0.1:8583        |
| /api/    | http://127.0.0.1:8581/       |
| /v100/   | http://192.168.1.63:8501/v1/ |
| /v101/   | http://192.168.1.63:8601/v1/ |

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

    # Strict Transport Security
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

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

    location /v101 {
        return 302 /v101/;
    }

    location /v101/ {
        proxy_pass http://192.168.1.63:8601/v1/;
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

server {
    listen      80;
    listen      [::]:80;
    listen      443 ssl http2;
    listen      [::]:443 ssl http2;

    server_name annotate.hanl.in;
    client_max_body_size 0;

    ssl_certificate /etc/nginx/ssl/hanl.in/hanl.in.crt;
    ssl_certificate_key /etc/nginx/ssl/hanl.in/hanl.in.key;
    ssl_trusted_certificate /etc/nginx/ssl/hanl.in/ggssl_trusted.crt;

    location / {
        proxy_pass http://127.0.0.1:8583;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

```

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

## 2025/3/23

- I decided to implement the backend for the Contact form using Google App Script with Google Sheet as data storage and send email notifications
  - It is free, has no monthly send limits, can send email, supports reCAPTCHA if we get too much spam
  - Surveyed form services: Basin, Formspree, Formspark, EmailJS, Google App Script
    - https://x.com/i/grok?conversation=1903594087619641466
  - Surveyed mailing services: Mailgun, SendGrid, Mailjet
    - https://x.com/i/grok?conversation=1903589185094926745
  - Reference:
    - https://blog.milanmaharjan.com.np/post/build-a-custom-contact-form-for-your-static-website/
    - https://www.googleappsscript.org/recent-additions/recaptcha-with-google-apps-script
    - https://developers.google.com/apps-script/guides/html
  - Deployment
    - https://script.google.com/macros/s/AKfycbzsTXBdoV3b5XggmNJZzF0hxzvMuS-mtHuRh50xvwNcPjs_fL4v1QPOMF9WRrR213_Xuw/exec
