import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import socket from 'socket.io';
import morgan from 'morgan';
import yargs from 'yargs';

let app = express();
let server = http.createServer(app);
export let io = socket(server);

//APP COMPONENTS
import controllers from './controllers';

const argv = yargs.argv;
const currentEnv = process.env.NODE_ENV = argv.env || process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(controllers);

server.listen(port, () => {
    console.log(`${currentEnv.toUpperCase()} - Server is listening on port ${port}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

export default app;