const mongoose =require("mongoose")
const Schema = mongoose.Schema


const listSchema = new Schema(
    {
        title : String ,
        description : String ,
        Image : String,
        price : String,
        location : String

    })

const List = mongoose.model("List" , listSchema)
module.exports = List