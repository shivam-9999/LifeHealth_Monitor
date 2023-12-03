//This file simply loads the correct configuration file 
//according to the process.env.NODE_ENV environment variable
//which is set in server.js (it's value is 'development')
// this code will in fact return ./env/development.js
// module.exports = require('./env/' + process.env.NODE_ENV + '.js');

import { db, sessionSecret, secretKey } from './env/development.js';

const developmentConfig = {
  db,
  sessionSecret,
  secretKey,
};

const environments = {
  development: developmentConfig,
};

const config = environments[process.env.NODE_ENV || 'development'];

export default config;