import https from 'https';
import fs from 'fs';
import path from 'path';

import {proffessionsModel} from '../../module/mongoSchemas.js'


async function GetProffessions(req,res)
{
    res.send(await proffessionsModel.find({}));
    
}
export {GetProffessions};
