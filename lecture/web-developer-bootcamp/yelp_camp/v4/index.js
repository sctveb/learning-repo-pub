const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Campground = require('./models/Campground');
const Comment = require('./models/Comment');
const User = require('./models/User');
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4", { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seedDB();


// INDEX
app.get("/", (req, res) => {
  res.render("landing");
});

// ---------------------------
// CAMPGROUND ROUTES

// INDEX CAMPGROUND
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: data });
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
  res.render("campgrounds/new");
});

// SHOW CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("campgrounds/show", { campground: data });
    }
  });
});

// ---------------------------
// COMMENT ROUTES

// NEW COMMENT
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: data});
    }
  })
  
}) 

// CREATE COMMENT
app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

// 

app.listen(3000, () => {
  console.log("3000 port used by express");
});
