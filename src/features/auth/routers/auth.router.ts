import { Router } from 'express';
import { signUpController } from '@features/auth/controllers/signup';

class AuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public registerRoutes() {
    this.router.post('/sign-up', signUpController.create);

    return this.router;
  }
}

export const authRouter: AuthRouter = new AuthRouter();
