import https from 'https';
import fs from 'fs';
import path from 'path';

import {employerModel,workerModel} from '../../module/mongoSchemas.js'
import {GetjobPostingById} from '../Controllers/jobPosting.js'


async function GetEmployer(req,res)
{
    let id=req.params.id;
    let employer={"employer":'','jobPosting':''};
    employer['employer']=await employerModel.findOne({'id':id});
    employer['jobPosting']=await GetjobPostingById(id);
    console.log(employer);
    res.send((employer));


}
async function GetMe(req,res)
{
    req.params.id=req.user.id;
    GetEmployer(req,res)
}
async function AddEmployer(req,res)
{
    if(await employerModel.findOne({"id":req.body.id})||await workerModel.findOne({"id":req.body.id}))
    {
        res.status(400).send("id already in database");
        return;
    }
    let new_Employer=new employerModel(req.body);
    
    await new_Employer.save();//save
    //res.send(new_Employer);
}
async function UpdateEmployer(req,res)
{
    await employerModel.updateOne({"id":req.body.id},{$set:req.body});//update
    console.log(req.body);
    res.send("updated");
}
export {GetEmployer, GetMe, AddEmployer, UpdateEmployer};