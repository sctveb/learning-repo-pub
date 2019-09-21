const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_960_720.jpg",
//     description: "This is Granite Hill"
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

app.get("/", (req, res) => {
  res.render("landing");
});
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: data });
    }
  });
});

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

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: data });
    }
  });
});

app.listen(3000, () => {
  console.log("3000 port used by express");
});
