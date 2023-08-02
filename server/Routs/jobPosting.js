import https from 'https';
import fs from "fs";


import path from 'path';
import express from 'express';
const router = express();

import {AddJobPosting,UpdateJobPosting,DeleteJobPosting} from '../Controllers/jobPosting.js';

router.post('/',AddJobPosting);
router.put('/', UpdateJobPosting);
router.delete('/',DeleteJobPosting);
export default router;