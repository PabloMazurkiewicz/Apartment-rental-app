import { Router } from 'express';

import auth from './auth.route';
import realtor from './realtor.route';
import user from './user.route';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/realtor', realtor);

export default router;