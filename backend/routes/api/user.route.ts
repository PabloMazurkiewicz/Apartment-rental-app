import { Router } from 'express';

import { getList, getOne, addFavo, deleteFavo, getFavorites } from 'controllers/user.controller';
import { checkJwt } from 'middlewares/checkJwt';
import { checkRole } from 'middlewares/checkRole';


const router = Router();

router.post('/', [checkJwt, checkRole(['USER'])], getList);

router.get('/:id', [checkJwt, checkRole(['USER'])], getOne);

router.get('/favorites/get', [checkJwt, checkRole(['USER'])], getFavorites);

router.post('/favorites/add', [checkJwt, checkRole(['USER'])], addFavo);

router.post('/favorites/delete', [checkJwt, checkRole(['USER'])], deleteFavo);

export default router;
