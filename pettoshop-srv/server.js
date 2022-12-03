const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes")
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//   secret: 'mypetshop',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));


// ----- testttt success
app.use(session({secret: "mysecret", 
resave: true, 
saveUninitialized: true}));



//-------



const username = "MariaBJ";
const password = "CEwXvddqMZUZ5rh";
const cluster = "clustertest.boyxs2h";
const dbname = "testproject";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

