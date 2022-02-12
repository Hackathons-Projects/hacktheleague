const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

/**Routes Import */
const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/** Routes */
app.use("/user", userRoute);
// app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Server Running");
});

mongoose
  .connect(process.env.MongoURL, {})
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`))
  )
  .catch((error) => console.log("Error connecting to the database: ", error));
