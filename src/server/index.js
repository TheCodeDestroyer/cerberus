import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import yargs from 'yargs';

const argv = yargs.argv;
const currentEnv = process.env.NODE_ENV = argv.env || process.env.NODE_ENV || 'dev';
const dev = currentEnv === 'dev';
const port = process.env.PORT || 8080;
let app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

if (!dev) {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

export default app;