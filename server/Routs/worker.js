import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {GetWorker,GetMe,AddWorker,UpdateWorker} from '../Controllers/worker.js';


router.get('/:id', GetWorker);
router.put('/', UpdateWorker);
router.get('/', GetMe);
router.post('/',AddWorker);

// router.delete('/:id',DeleteCoin);
export default router;