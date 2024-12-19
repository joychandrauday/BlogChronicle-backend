// 1. Sending requests to db from client

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './app/modules/Error/globalErrorHandler';
import { userRoutes } from './app/modules/User/user.routes';
import { authRoutes } from './app/modules/Auth/auth.routes';
import { blogRoutes } from './app/modules/Blog/blog.routes';


const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Blog Chronicle  backend!!!');
});

// //appllication routes
app.use('/api/auth', authRoutes) // order routes
app.use('/api/users', userRoutes) // product routes
app.use('/api/blogs', blogRoutes) // order routes
app.use('/api/admin', userRoutes)



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {//+
  errorHandler(err, req, res, next);//+
});
export default app;
