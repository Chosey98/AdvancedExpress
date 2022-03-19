import express from 'express';
import bodyParser from 'body-parser';
import sqlConnection from './connection.js';
import authRouter from './routes/auth/authRouter.js';
import apiRouter from './routes/api/apiRouter.js';
import cors from 'cors';
const app = express();

sqlConnection.connect();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.listen(5000, () => console.log('Up and running'));
