import https from 'https';
import fs from 'fs';
import path from 'path';

import {areaModel} from '../../module/mongoSchemas.js'


async function GetAreas(req,res)
{
    
    let data= await areaModel.find({});
    console.log(data);
    
   res.send(JSON.stringify(data));
    //return await areaModel.find({},{"name":true})

}
export {GetAreas};
