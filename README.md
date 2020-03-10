# annotate-ui

Protein Annotation using Recurrent Neural Network Models

# Release workflow

```bash
npm run release
git describe
git push --follow-tags origin master
```

- standard-version does the following:
  - bumps the version in metadata files (package.json, composer.json, etc).
  - uses conventional-changelog to update CHANGELOG.md
  - commits package.json (et al.) and CHANGELOG.md
  - tags a new release

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
