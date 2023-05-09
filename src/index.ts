import express, {Application, NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';
import {default as errorMiddleware} from './middlewares/error.middleware';
import routes from './routes';

const app: Application = express();

(async () => {
  try {
    await mongoose.connect(config.mongo.url, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('Database connect success');
    app.listen(config.server.port, () => {
      console.log(`Server is running at http://localhost:${config.server.port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

//error middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(httpStatus.NOT_FOUND, 'Not found!'));
});

app.use(errorMiddleware);
