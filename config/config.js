// config.js
require('dotenv').config();

const env = process.env;

const dev = {
  app: {
    port: parseInt(env.NODE_APP_PORT) || 3000
  },
  db: {
    url: env.NODE_DB_URL || 'mongodb://localhost:27017/app'
  }
};

const test = {
  app: {
    port: parseInt(env.NODE_APP_PORT) || 3000
  },
  db: {
    url: env.NODE_DB_URL || 'mongodb://localhost:27017/app-test'
  }
};

const production = {
  app: {
    port: parseInt(env.NODE_APP_PORT) || 3000
  },
  db: {
    url: env.NODE_DB_URL || 'mongodb://localhost:27017/app-prod'
  }
};

const config = {
  dev, test, production
};
module.exports = config[env.NODE_ENV || 'dev'];