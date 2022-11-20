const express = require("express");
const User = require("./userModel");
const Item = require("./itemModel");
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

app.post("/login", (req, res) => {
  
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, (err, user) => {
    if (err) {
      return res.status(401).json({msg:"ERROR"});
    };
    if (!user) {
      return res.status(401).json({msg:"WRONG LOGIN"});
    };
    //req.session.userId = user._id;
    res.status(200).json({
      username: user.username,
      password: user.password
    });
  });

});

app.post("/register", (req, res) => {
  
  var newUser = new User({
    username:req.body.username,
    password:req.body.password,
  });

  User.countDocuments({username:newUser.username}, function(err, count){
    if (err) {
      return res.status(401).json({msg:"ERROR"});
    }
    if (count<0) {
      return res.status(401).json({msg:"USER ALREADY EXISTS"});
    }else{
      newUser.save((error, user)=>{
        if(error) return console.error(err);
        //req.session.userId = user._id;
        res.status(200).json({username: user.username})
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
  const items = await Item.find({});

  try {
    response.send(items);
  } catch (error) {
    response.status(500).send(error);
  }
});

//cart APIs

//orderAPIs
module.exports = app;
