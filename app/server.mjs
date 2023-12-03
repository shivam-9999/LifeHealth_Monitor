// Load the module dependencies using import syntax
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import morgan from 'morgan';
import compress from 'compression';
import cors from 'cors';
import schema from "./graphql/index.mjs";
import * as dotenv from 'dotenv';
dotenv.config();

// Import other dependencies using import syntax
import connectToDatabase from './config/mongoose.js';
import { graphqlHTTP } from 'express-graphql';
// import schema from './graphql.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Create a new Express application instance
const app = express();

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

// Use the 'body-parser' and 'method-override' middleware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// production cors
if (process.env.NODE_ENV === "production") {
    app.use(cors( {origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204}));
}
//development cors
if (process.env.NODE_ENV === "development") {
    app.use(cors( {origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204}));
}

// Use method-override for handling PUT or DELETE methods
app.use(methodOverride());
app.use(methodOverride('_method'));


// Configure the 'session' middleware
app.use(session({
    secret:process.env.REALSECRET,
    saveUninitialized: true,
    resave: true,
}));

// Create a new Mongoose connection instance
const db = connectToDatabase();

// Set up GraphQL endpoint
app.use(
    '/graphql*',
    graphqlHTTP({
        schema: schema,
        rootValue: global,
        graphiql:"true",
    })
);
process.env.NODE_ENV === "development"
// Serve the build folder
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.join(__dirname, './build');
app.use(express.static(buildPath));

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5002;

// Start the Express application on port 5002
app.listen(PORT, function () {
    console.log('GraphQL Server running at http://localhost:PORT/graphql'+ PORT);
});

// Export the Express application instance for external usage
export default app;
