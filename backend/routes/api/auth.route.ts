import { Router } from 'express';
import {login, register} from 'controllers/auth.controller'
import {
  validatorLogin,  
  validatorRegister,
} from 'middlewares/validations/auth.validation';

const router = Router();

router.post('/login', [validatorLogin], login);

router.post('/signup', [validatorRegister], register);

export default router;
