const express = require("express");
const User = require("./userModel");
const Item = require("./itemModel");
const Order = require("./orderModel");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const app = express();

//users APIs
app.get("/users", async (request, response) => {
  User.find((error, users) =>{
    if (error) {
      return console.error(err);
    };
    response.json(users);
  });
});

app.post("/login", async (request, response) => {
  
  User.findOne({
    email: request.body.email,
    password: request.body.password

  }, (err, user) => {
    if (err) return response.status(401).json({msg:"ERROR"});
    if (!user) {
      
      return response.status(401).json({msg:"WRONG LOGIN"});
    } 
    
    //req.session.userId = user._id;
    request.session.user = user;
    request.session.save();
    console.log(user)
    response.status(200).json(user);

  });

});


app.get("/islogged", (req, res)=> {
  if(!req.session.user) {
    return res.status(401).json();
  };

  // User.findOne ( {user: req.session.user}, (error, user) => {
  //   if(error) return res.status(401).json({msg: "Error"});
  //   if(!user) return res.status(401).json({msg: "Error"});

  //   req.session.user = user;
  //   res.status(200).json({user})
  // })
})

app.post("/register", (req, res) => {
   
  console.log("here")
  const newUser = new User({
    email:req.body.email,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    address:req.body.address,
    postalcode:req.body.postalcode,
    city:req.body.city,
    country:req.body.country,
    phone:req.body.phone,
  });

  User.countDocuments({email: newUser.email}, function(err, count){
    if (err) {
      return res.status(401).json({msg:"ERROR"});
    }
    if (count<0) {
      return res.status(401).json({msg:"USER ALREADY EXISTS"});
    }else{
      newUser.save((error, user)=>{
        if(error) return console.error(err);
        //req.session.userId = user._id;
        res.status(200).json({email: user.email})
      })
    }
  })
});

//items APIs
app.get("/items", async (request, response) => {
  Item.find((error, items) =>{
    if (error) {
      return console.error(err);
    };
    response.json(items);
  });
});

app.get("/item/:id", async (request, response) => {
  var item = Item.findOne({
    _id: request.body.id
  });

  try {
    response.send(item);
  } catch (error) {
    response.status(500).send(error);
  }
});

//orderAPIs
app.get("/orders", async (request, response) => {
  Order.find((error, orders) =>{
    if (error) {
      return console.error(err);
    };
    response.json(orders);
  });
});

module.exports = app;
