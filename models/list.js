const mongoose =require("mongoose")
const Schema = mongoose.Schema


const listSchema = new Schema(
    {
        title : String ,
        description : String ,
        image : String,
           /* default :"https://unsplash.com/photos/a-white-building-with-a-red-fence-around-it-oJxUdvW2cwQ",
            set : (v)=>
                v===""
            ? "https://unsplash.com/photos/a-white-building-with-a-red-fence-around-it-oJxUdvW2cwQ"
            : v*/
        
        price : Number,
        location : String

    })

const List = mongoose.model("List" , listSchema)
module.exports = List