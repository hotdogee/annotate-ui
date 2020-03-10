# annotate-ui

Protein Annotation using Recurrent Neural Network Models

# Release workflow

```bash
npm run release # runs standard-version
git describe # prints version
git push --follow-tags origin master
```

- standard-version does the following:
  - bumps the version in metadata files (package.json, composer.json, etc).
  - uses conventional-changelog to update CHANGELOG.md
  - commits package.json (et al.) and CHANGELOG.md
  - tags a new release

# Committing code

## Practical tips

### Commit message format

`type(scopes): message`

Examples:

- `fix(ui): fixed user login`
- `chore(api): update libs`
- `feat(api): added users service`

### Command Line Tools: [commitizen](http://commitizen.github.io/cz-cli/)

- Use `npx git-cz` to get an interactive list of types and scopes to choose from

### VSCode Tools: [vscode-commitizen](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen)

- Open the command panel (F1) and type 'conventional commit'.
- Select the command and answer the questions afterwards (type, scope, subject, body, breaking changes, closed issues).

## List of types

```
chore:    Other changes that don't modify src or test files
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
WIP:      Work in progress
style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
revert:   Reverts a previous commit
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
```

## Why

- Used for automated version generation and changelog generation
- [Conventional Commits](https://www.conventionalcommits.org)
- [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
  - [Development: How to adapt a custom conventional changelog](https://medium.com/vlad-arbatov/development-how-to-adapt-a-custom-conventional-changelog-33ff3b13c832)

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
