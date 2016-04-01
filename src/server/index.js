import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import yargs from 'yargs';
import shell from 'shelljs';

const argv = yargs.argv;
const currentEnv = process.env.NODE_ENV = argv.env || process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8080;
let app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`${currentEnv.toUpperCase()} - Server is listening on port ${port}`);
});

app.get('/kodi', function(req, res) {
    let result = shell.exec('runKodi');
    console.log(result);
    res.send(result);
});

app.get('/moonlight', function(req, res) {
    let result = shell.exec('runKodi');
    console.log(result);
    res.send(result);
});
