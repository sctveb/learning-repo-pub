const express = require("express");
const mongoose = require("mongoose");
const app = express();
const seedDB = require("./seeds");
const Campground = require('./models/Campground');
const User = require('./models/User');
const Comment = require('./models/Comment');

mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

// 
app.get("/", (req, res) => {
  res.render("landing");
});

// INDEX CAMPGROUND
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: data });
    }
  });
});

// CREATE CAMPGROUND
app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { name, image, description };
  Campground.create(newCampground, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("show", { campground: data });
    }
  });
});

app.listen(3000, () => {
  console.log("3000 port used by express");
});
