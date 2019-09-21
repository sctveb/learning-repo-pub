const express = require('express');
const mongoose = require('mongoose');
const app = express();

// const campgrounds = [
//     {name: "Salmon Creek", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c732873d29249cd58_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f72277dd19345c5_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732873d29249cd58_340.jpg"},
// ]

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use( express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
})
const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name: "Granite Hill", image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f72277dd19345c5_340.jpg"},
// (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// }
// )


app.get("/", (req, res) => {
    res.render("landing");
});
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: data});
        }
    })    
    // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name, image};
    Campground.create(newCampground, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
    // campgrounds.push(newCampground);
    // res.redirect('/campgrounds');
})

app.get("/campgrounds/new", (req,res) => {    
    res.render("new.ejs");
});

app.listen(3000, () => {
    console.log("3000 port used by express")
});