const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString = "mongodb+srv://SE12:CSH2024@cluster0.v1bihy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and model for menu
const menuSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: {type: String},
  dietary: { type: String },
  allergies:{type: String},
  picture:{type: String},
  rating:{type: Number},
});

const Menu = mongoose.model("Menu", menuSchema);


// Find a food
app.get("/menu", (req, res) => {
  Menu.find({})
    .then((menu) => {
      res.render("menu.ejs",{ menu: menu});
    })
});
app.get("/admin", (req, res) => {
  Menu.find({})
    .then((menu) => {
      res.render("admin.ejs",{ menu: menu});
    })
});

app.get("/", (req, res) => {
res.status(200).sendFile(__dirname + "/public/about.html");
});


app.get("/contact", (req, res) => {
res.status(200).sendFile(__dirname + "/public/contact.html");
});
// Create a 
app.post("/menu", (req, res) => {
  const newmenu = new Menu({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    dietary: req.body.dietary,
    allergies: req.body.allergies, 
    picture: req.body.picture,
   rating: req.body.rating,
  });
  newmenu.save().then((menu) => res.status(200).json(menu));
})
// .catch((err)=>{
//   console.log("Something went wrong!")
//   res.status(500).send("500 internal error")
// })




app.delete("/Menu/:id", (req,res)=>{
  const filter = {_id:req.params.id};

  Menu.findOneAndDelete(filter)
  .then((deletedMenu)=>{
    res.json(deletedMenu);
  })
.catch((err)=>{
  console.error("Error deleting menu:", err);
  res.status(500).sendFile(__dirname+"/public/menu.html");
})
  
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.patch('/menu/:id', (req, res)=>{
  const filter ={_id: req.params.id};
  const update ={$set: {price: req.body.price}}

  Menu.findOneAndUpdate(filter, update,{ new: true})
  .then((updatedMenuItem)=>{
  console.log(updatedMenuItem)
  res.json(updatedMenuItem)
})
})

