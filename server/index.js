import express from 'express';
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import jwt  from "jsonwebtoken";
import verifyToken from './middelware/outh.js';
//import './module/connectMongo.js';
import employer from './Routs/employer.js';
import worker from './Routs/worker.js';
import login from './Routs/login.js';
import proffessions from './Routs/proffessions.js';
import jobPosting from './Routs/jobPosting.js';
import area from './Routs/area.js';
import '../module/connectMongo.js';
import { AddEmployer } from './Controllers/employer.js';
import { AddWorker } from './Controllers/worker.js';
var corsOptions = {
  origin: "*"
};
const app=express();
const port=3000;

  
  app.use(cors(corsOptions));
  
//   // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.post('/employer',AddEmployer);//הרשמות מעסיק למערכת
  app.post('/worker',AddWorker);//הרשמות עובד למערכת
  


app.use('/login',login);//התחברות
  
app.use(verifyToken);//בדיקת token
app.use('/employer',employer);//ניתוב למעסיק
app.use('/worker',worker);//ניתוב לעובד
app.use('/proffessions',proffessions);//ניתוב למקצועות
app.use('/jobPosting',jobPosting);//נותוב לפרסומי דרושים
app.use('/area',area);//ניתוב לאיזורים


//app.get('/',(req,res)=>{res.send('hello world')});


app.listen(port,()=>{
    console.log("server run");
});