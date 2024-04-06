const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URL;

const jwt_serret = process.env.JWT_SECRET;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const User = require('./UserDetails');

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  console.log("REQ BODY ", req.body);
  const { name, email, mobile, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  // const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      mobile,
      password: password,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log('Req body login ', req.body);
  const oldUser = await User.findOne({ email: email });
  console.log('oldUser found');

  if (!oldUser) {
    return res.send({ data: "User doesn't exists!!" });
  }

  // if (await bcrypt.compare(password, oldUser.password)) {
  if (password === oldUser.password) {
    const token = jwt.sign({ email: oldUser.email }, jwt_serret);
    console.log(token);
    if (res.status(201)) {
      return res.send({
        status: "ok",
        data: token,
      });
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, jwt_serret);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});


app.get("/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: "Ok", data: data });
  } catch (error) {
    return res.send({ error: error });
  }
});


app.listen(5001, () => {
  console.log("Node js server started at port 5001");
});
