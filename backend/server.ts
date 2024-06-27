import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

import BaseRouter from './routes';

import './utils/response/customSuccess';
import ApiError from './utils/response/customError/customError';

// Init express
const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors())

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'uploads')));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    // app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.HttpStatusCode).json(err.JSON);
  }

  return res.status(500).json({
    error: err.message,
  });
});


// Export express instance
export default app;
