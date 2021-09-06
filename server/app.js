const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
dotenv.config({ path: "./config/config.env" });
const { v4: uuidv4 } = require("uuid");
const Order = require("./Models/Order");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.get("/", (req, res) => {
  req.session.user = {
    uuid: uuidv4(),
  };
  req.session.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.session.user);
    }
  });
});

app.post("/order", (req, res) => {
  try {
    const order = new Order({
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    order.save();

    res.status(201).json(order);
  } catch (err) {
    console.log(err);
  }
});

app.get("/end", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Session is destroyed");
    }
  });
});

app.listen(5000, () => console.log("Server up and running at port 5000"));
