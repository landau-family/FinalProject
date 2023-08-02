import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {GetEmployer,GetMe,AddEmployer,UpdateEmployer} from '../Controllers/employer.js';


router.get('/:id', GetEmployer);
router.get('/', GetMe)
router.post('/',AddEmployer);
 router.put('/', UpdateEmployer);
// router.delete('/:id',DeleteCoin);
export default router;