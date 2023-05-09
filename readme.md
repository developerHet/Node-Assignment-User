

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/developerhet/node-assignment-user.git
cd node-assignment-user
```

Install the dependencies:

```bash
npm install
```





## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm run start:dev
```

Running in production:

```bash
npm run start:prod
```

Running in multiple cluster:
```bash
npm run start:multi
```

## Environment Variables
Set the environment variables:
```bash
# create .env file inside config folder
# copy .env.example data into .env

# Port
PORT = # default 4000

# URL of the Mongo DB
MONGO_URI = mongodb://127.0.0.1:27017/database_name
```



### API Endpoints

List of available routes:


**User routes**:\
`POST api/v1/users` - Create a user\
`GET api/v1/users` - Get all users\
`GET api/v1/users/:userId` - Get user\
`PUT api/v1/users/:userId` - Update user\
`DELETE api/v1/users/:userId` - Delete user

