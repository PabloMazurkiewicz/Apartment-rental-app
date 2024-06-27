import { Router } from 'express';
import multer from 'multer';

import {v4 as uuidv4} from 'uuid';
import path from 'path';

import { addOne, deleteOne, getAll, getOne } from 'controllers/realtor.controller';
import { checkJwt } from 'middlewares/checkJwt';
import { checkRole } from 'middlewares/checkRole';


const DIR = "./uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
        cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
  
const router = Router();

router.post('/', [checkJwt, checkRole(['REALTOR'])], getAll);

router.post('/add', [checkJwt, checkRole(['REALTOR']), upload.single('image')], addOne);

router.get('/:id', [checkJwt, checkRole(['REALTOR'])], getOne);

router.post('/delete', [checkJwt, checkRole(['REALTOR'])], deleteOne);

export default router;
