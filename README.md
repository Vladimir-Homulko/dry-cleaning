## Description

Dry Cleaning order system API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Create admin

```bash
$ npx nestjs-command create:admin
```

## Swagger route
```bash
http://localhost:8080/api-docs
```

## ENV FILE
```bash
PORT=8080
DB_URL=(mongo db url must be here...)
ACCESS_TOKEN_SECRET=at-secret
REFRESH_TOKEN_SECRET=rt-secret
NODEMAILER_SENDER_EMAIL=email@gmail.com
EMAIL_PASS=*****
```