const mongoose =require("mongoose")
const initData = require("../init/data.js")
const List = require("../models/list.js")

main()
.then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_2');
}
const initDB = (async()=>{
    await List.deleteMany({})
    await List.insertMany(initData.data)
    console.log("data has initialized")
})
initDB()