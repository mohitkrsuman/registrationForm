const mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost:27017/youtubeReg",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 }).then(()=>{
    console.log(`connection succesfull...`);
 }).catch((err)=>{
    console.log(err);
 })