const express = require("express")
const app = express()
const mongoose = require("mongoose")
const List = require("./models/list.js");
const User = require("./models/user.js") 
const path = require("path")
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")


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
app.use(express.urlencoded({extended : true}))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname ,"/public")))
app.use(methodOverride("_method"))


app.get("/",(req,res)=>{
    res.render("home/root.ejs")
})

app.get("/listing" , async(req,res)=>{
 const allListing =   await List.find({})
 res.render("listing/index.ejs" , {allListing})
})
/*app.get("/listing/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await List.findById(id);
        
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
console.log('Listing:', listing);
res.render("listing/show", { listing });


        //res.render("listing/show.ejs", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(500).send("Internal Server Error");
    }
    console.log('Listing:', listing);

});*/
//new rote
app.get("/listing/new",async(req,res)=>{
   res.render("listing/new.ejs") 
})

// show route
app.get("/listing/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await List.findById(id);
    res.render("listing/show.ejs", { listing });
    

});

//create route
app.post("/listing" ,async(req,res)=>{
    const newListing =new List( req.body.listing)
    await newListing.save()
    res.redirect("/listing")

})

// edit form route
app.get("/listing/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await List.findById(id);
    res.render("listing/edit.ejs", { listing });
});

// update route
app.put("/listing/:id", async (req, res) => {
    const { id } = req.params;
    await List.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
});

app.get("/listing/:id/book", async (req, res) => {
    const { id } = req.params;
    const listing = await List.findById(id);
    res.render("booking/user.ejs", { listing });
    
});


/*app.put("/listing/:id/book", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body.user;

    
    console.log(`Booking: ${name}, ${email} for listing ${id}`);


    res.render("listing/booked.ejs");
});*/


   app.get('/signup', (req, res) => {
    res.render('signup/user', {
      signup: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    });
  });

  app.put('/signup', (req, res) => {
    const signupData = req.body.signup;
    // Process or save signupData here
  
    // For now, just send back the submitted data
    //res.send(`Received signup: ${JSON.stringify(signupData)}`);
    res.redirect("/listing")
  });
  

  /*app.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('Form received');
  });*/
  


/*app.get("/listing/:id/signup", async (req, res) => {
    const { id } = req.params;
    const listing = await List.findById(id);
    res.render("", { listing });  // Make sure 'user.ejs' expects 'listing'
});*/



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