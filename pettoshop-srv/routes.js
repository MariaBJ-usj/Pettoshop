const express = require("express");
const User = require("./userModel");
const Item = require("./itemModel");
const Order = require("./orderModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const app = express();

//users APIs
app.get("/users", async (request, response) => {
  User.find((error, users) => {
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
    if (err) return response.status(401).json({
      msg: "ERROR"
    });
    if (!user) {

      return response.status(401).json({
        msg: "WRONG LOGIN"
      });
    }
    request.session.user = user;
    request.session.save();
    console.log(user)
    response.status(200).json(user);
  });

});


app.get("/islogged", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json();
  };
})


app.get("/logout", (req, res)=> {
  req.session.destroy(error=> {
    if(error) return res.status(409).json({msg: "logout error"});
    res.status(200).json({msg:"logout ok"});

  })
})

app.post("/register", (req, res) => {

  console.log("here")
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    postalcode: req.body.postalcode,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
  });

  User.countDocuments({
    email: newUser.email
  }, function (err, count) {
    if (err) {
      return res.status(401).json({
        msg: "ERROR"
      });
    }
    if (count < 0) {
      return res.status(401).json({
        msg: "USER ALREADY EXISTS"
      });
    } else {
      newUser.save((error, user) => {
        if (error) return console.error(err);
        request.session.user = user;
        request.session.save();
        console.log(user)
        response.status(200).json(user);
      })
    }
  })
});

//items APIs
app.get("/items", async (request, response) => {
  Item.find((error, items) => {
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

  Order.aggregate([{
    $lookup: {
      from: "items",
      localField: "item_id",
      foreignField: "_id",
      as: "order_item",
    }
  }]).exec((error, orders) => {
    if (error) {
      return console.error(err);
    };
    response.json(orders);
  });

});

app.post("/orders", async (request, response) => {

  Order
    .aggregate([{
        $match: {
          user_id: ObjectId(request.body.user_id)
        }
      },
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "order_item"
        }
      }
    ])
    .exec((error, orders) => {
      if (error) return response.status(401).json({
        msg: "ERROR"
      });
      if (!orders) {
        return response.status(401).json({
          msg: "NO ITEMS IN CART"
        });
      }
      response.status(200).json(orders);
    });

});

app.post("/addorder", async (req, res) => {

  const newOrder = new Order({
    user_id: req.body.user_id,
    item_id: req.body.item_id,
    quantity: req.body.quantity
  });

  Order.countDocuments({
    user_id: req.body.user_id,
    item_id: req.body.item_id
  }, function (err, count) {
    if (err) {
      return res.status(401).json({
        msg: "ERROR"
      });
    }
    if (count > 0) {
      Order.findOneAndUpdate({
          user_id: req.body.user_id,
          item_id: req.body.item_id
        }, 
        {
          quantity: req.body.quantity
        },
        (err, order) => {
          if (err) {
            return res.status(400).json({
              error: "CANNOT UPDATE ORDER"
            });
          }
          res.status(200).json(order)
        })
    } else {
      newOrder.save((error, user) => {
        if (error) return console.error(err);
        res.status(200).json("ORDER ADDED")
      })
    }
  })
});

app.put("/updateorder", async (req, res) => {

  Order.countDocuments({
    _id: req.body._id
  }, function (err, count) {
    if (err) {
      return res.status(401).json({
        msg: "ERROR"
      });
    }
    if (count > 0) {
      Order.findOneAndUpdate({
        _id: req.body._id
        }, 
        {
          quantity: req.body.quantity
        },
        (err, order) => {
          if (err) {
            return res.status(400).json({
              error: "CANNOT UPDATE ORDER"
            });
          }
          res.status(200).json("ORDER UPDATED")
        })
    };
  })
});

module.exports = app;