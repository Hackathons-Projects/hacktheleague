const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

/**Routes Import */
const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/** Routes */
app.use("/user", userRoute);
//app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/hospital.html");
});

app.get("/details", (req, res) => {
  res.sendFile(__dirname + "/public/details.html");
});

mongoose
  .connect(process.env.MongoURL, {})
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`))
  )
  .catch((error) => console.log("Error connecting to the database: ", error));
