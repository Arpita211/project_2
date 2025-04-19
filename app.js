const express = require("express")
const app = express()
const mongoose = require("mongoose")
const List = require("./models/list.js");
const path = require("path")


main()
.then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_2');
}

app.set("view engine", "ejs")
app.set("views" , path.join(__dirname ,"views"))

app.get("/",(req,res)=>{
    res.send(" this is root node")
})

app.get("/listing" , async(req,res)=>{
 const allListing =   await List.find({})
 res.render("listing/index.ejs" , {allListing})
})

/*app.get("/test" ,async (req,res)=>{
    let sampleList = new List({
        title : "Kedarnath Temple",
        description : " A temple of lord shiva",
        image :"",
        price : " 5000",
        location :" UTTARAKHAND",
    })
    await sampleList.save().then(()=>{
        console.log("list is saved")
    })
    .catch((err)=>{
        console.log(err)
    })
    res.send("successful testing")
})*/

app.listen(8000,()=>{
    console.log(`server is listening at 8000 port`)
})