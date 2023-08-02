import { Application } from 'express';
import { BASE_PATH } from '@shared/constants/router';
import { authRouter } from '@features/auth/routers/auth.router';

export const setUpAppRouter = (app: Application) => {
  app.use(BASE_PATH, authRouter.registerRoutes());
};
