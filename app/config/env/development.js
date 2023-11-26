//Development configuration options
//To sign the session identifier, use a secret string
// ./env/development.js
import * as dotenv from 'dotenv';
dotenv.config();
export const db = process.env.URI;
export const sessionSecret = process.env.SESSIONSECRET;
export const secretKey = process.env.REALSECRET;
