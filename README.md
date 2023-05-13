## express-typescript

A node express project boilerplate with typescript

Ref:

- [TypeScript Express tutorial](https://wanago.io/courses/typescript-express-tutorial/)

- [Node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate?fbclid=IwAR32hbEL6N4aKZY1fEJD8F-wdGXoJkW16Uy-HMSDSoOQ6A2poLoQ7QK8b70#features)

## Installation

```bash
yarn install
```

## Running

```bash
yarn dev
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
PORT = 5050
MONGO_USER = user
MONGO_PASSWORD = pass
MONGO_PATH = '@cluster0.ezvhqgu.mongodb.net/?...'

#jwt
JWT_SECRET = yourSecret
# Number of seconds after which an access token expires
JWT_ACCESS_EXPIRATION_SECONDS = 3600
# Number of days after which an access token expires
JWT_REFRESH_EXPIRATION_DAYS = 365

# SMTP configuration options for the email service
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/register` - register\
`POST /auth/login` - login\
`POST /auth/refresh-tokens` - refresh auth tokens\
`POST /auth/send-verification-email` - send verification email\
`POST /auth/verify-email` - verify email

**User routes**:\
`POST /users` - create a user\
`GET /users` - get all users\
`GET /users/:userId` - get user\
`PATCH /users/:userId` - update user\
`DELETE /users/:userId` - delete user\
