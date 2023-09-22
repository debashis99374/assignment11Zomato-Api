const mongoose=require('mongoose')
const {MongoClint}=require("mongodb")

const mongoURI=process.env.MONGODB

mongoose
.connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("mongodb connected")
})
.catch((err)=>{
 console.error("error occured",err)
})