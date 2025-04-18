const express = require("express")
const app = express()
const mongoose = require("mongoose")
const List = require("./models/list.js");


main()
.then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_2');
}

app.get("/",(req,res)=>{
    res.send(" this is root node")
})
app.get("/test" ,async (req,res)=>{
    let sampleList = new List({
        title : "",
        description : "",
        image :"",
        price : "",
        location :"",
    })
    await sampleList.save().then(()=>{
        console.log("list is saved")
    })
    .catch((err)=>{
        console.log(err)
    })
    res.send("successful testing")
})

app.listen(8000,()=>{
    console.log(`server is listening at 8000 port`)
})