require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); // We will use this later
const methodOverride = require("method-override");
const routes = require("./routes/index.routes");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routes);

app.get("/", (req, res) => {
  return res.render("index");
});

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to MongoDB");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
