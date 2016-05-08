import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import yargs from 'yargs';
import mongoose from 'mongoose';
import session from 'express-session';

//APP COMPONENTS
import controllers from './controllers';
import socketIO from './middleware/socketIO';

let app = express();
export let server = http.createServer(app);
export let io = socketIO.listen(server);
mongoose.connect('mongodb://localhost/cerberus');

const argv = yargs.argv;
const currentEnv = process.env.NODE_ENV = argv.env || process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret: 'super_secret_session_key', //TODO: Update to proper one later
    saveUninitialized: true,
    resave: true
}));

app.use(controllers);

server.listen(port, () => {
    console.log(`${currentEnv.toUpperCase()} - Server is listening on port ${port}`);
});

export default app;
