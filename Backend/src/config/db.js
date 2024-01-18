const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected MONGODB");
  })
  .catch((err) => {
    console.log("failed" + err);
  });
