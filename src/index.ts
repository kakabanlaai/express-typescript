import express, {Application, NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';
import {default as errorMiddleware} from './middlewares/error.middleware';
import routes from './routes';
import validateEnv from './utils/validateEnv';

//validate environment variable
validateEnv();

const app: Application = express();

//initialize middleware
app.use(helmet());
app.use(morgan('combined'));
//body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router
app.use(routes);

//error middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(errorMiddleware);

//connect database
mongoose
  .connect(config.mongo.url, {
    serverSelectionTimeoutMS: 3000,
  })
  .then((result) => {
    console.log('Database connect success!');
  })
  .catch((err) => {
    console.log('Database connect success!', err);
  });

const port = config.server.port;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
