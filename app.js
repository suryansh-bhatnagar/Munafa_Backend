const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config()
const { register, login, userDetails } = require("./controllers/Auth");
const { connectToDb } = require("./database");
const { savePaymentDetails, getAllTransaction } = require("./controllers/Payment");


connectToDb();


app.get("/", (req, res) => {
  res.send({ status: "Started" });
});


app.post("/register", register);
app.post("/login-user", login);
app.post("/userdata", userDetails);

app.post("/savepaymentdetails", savePaymentDetails);
app.post('/getAllTransactions', getAllTransaction);



app.listen(5001, () => {
  console.log("Node js server started at port 5001");
});
