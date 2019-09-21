const express = require("express");
const router = express.Router();

const Campground = require("../models/Campground");
// ---------------------------
// CAMPGROUND ROUTES

// INDEX CAMPGROUND
router.get("/", (req, res) => {
    console.log(req.user);
    Campground.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: data });
        }
    });
});

// CREATE CAMPGROUND
router.post("/", isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
    };
    const newCampground = { name, image, description, author };
    Campground.create(newCampground, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW CAMPGROUND
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW CAMPGROUND
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("campgrounds/show", { campground: data });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;