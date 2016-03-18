import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const dev = env === 'development';
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname} /../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
