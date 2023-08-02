import https from 'https';
import fs from 'fs';
import path from 'path';

import {workerModel,employerModel} from '../../module/mongoSchemas.js'
import {GetjobPosting} from '../Controllers/jobPosting.js'


async function GetWorker(req,res)
{
    let id=req.params.id;
    let worker={'worker':'','jobPosting':''};
    worker['worker']=await workerModel.findOne({'id':id})
    worker['jobPosting']=await GetjobPosting()
    res.send(worker)


}
async function GetMe(req,res)
{
    req.params.id=req.user.id;
    console.log(req.params.id);
    console.log("in GetMe!!!!!!!!!!!!!!!!!!!!!");

    GetWorker(req,res)
}
async function AddWorker(req,res)
{
    let employer=await employerModel.findOne({"id":req.body.id})
    let worker=await workerModel.findOne({"id":req.body.id})
    console.log(employer)
    console.log(worker)
    if(worker||employer)
    {
        res.status(400).end("id already in database");
        return
    }

    let new_Worker=new workerModel(req.body);
    await new_Worker.save();//save
    //res.send(new_Worker);
}
async function UpdateWorker(req,res)
{
    console.log("in update");
    await workerModel.updateOne({"id":req.user.id},{$set:req.body});//update
    res.send( await workerModel.findOne({"id":req.user.id}))
}
export {GetMe,GetWorker,AddWorker,UpdateWorker};