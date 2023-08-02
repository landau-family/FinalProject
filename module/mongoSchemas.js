import mongoose from 'mongoose'

const employerSchema=new mongoose.Schema({
    id:String,
    email:String,
    name:String,
    area:String
});
const employerModel=new mongoose.model('employers',employerSchema);

const workerSchema=new mongoose.Schema({
    id:String,
    email:String,
    name:String
});
const workerModel=new mongoose.model('workers',workerSchema);


const proffessionsSchema=new mongoose.Schema({
    name:String
});
const proffessionsModel=new mongoose.model('proffessions',proffessionsSchema);


const areaSchema=new mongoose.Schema({
    name:String
});
const areaModel=new mongoose.model('areas',areaSchema);

const jobPostingSchema=new mongoose.Schema({
    dateTime:Date,
    employer:String,
    area:String,
    proffession:String,
    desc:String
});
const jobPostingModel=new mongoose.model('jobPostings',jobPostingSchema);





export {employerModel,workerModel,proffessionsModel,areaModel,jobPostingModel};