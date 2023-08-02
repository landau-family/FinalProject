import https from 'https';
import fs from 'fs';
import path from 'path';

import {jobPostingModel} from '../../module/mongoSchemas.js'



async function GetjobPostingById(id)
{
    return await jobPostingModel.find({'employer':id});
}
async function GetjobPosting()
{
    return await jobPostingModel.find({});
    
}
async function AddJobPosting(req,res)
{
    let new_jobPosting=new jobPostingModel(req.body);
    await new_jobPosting.save();//save
    res.send("added");
}
async function UpdateJobPosting(req,res)
{
    await jobPostingModel.updateOne({"dateTime":req.body.dateTime,"employer":req.body.employer},{$set:req.body});//update
    res.send("updated");
}
async function DeleteJobPosting(req,res)
{
    await jobPostingModel.deleteOne({"dateTime":req.body.dateTime,"employer":req.body.employer});
    res.send("deleted");
}
export {GetjobPosting,AddJobPosting,UpdateJobPosting,DeleteJobPosting,GetjobPostingById}