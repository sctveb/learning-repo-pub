const express = require("express");
const router = express.Router();

const Campground = require("../models/Campground");
// ---------------------------
// CAMPGROUND ROUTES

// INDEX CAMPGROUND
router.get("/", (req, res) => {
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
            res.render("campgrounds/show", { campground: data });
        }
    });
});

// EDIT CAMPGROUND
router.get("/:id/edit", checkOwnership, (req, res) => {    
        Campground.findById(req.params.id, (err, data) => {              
                res.render("/campgrounds/edit", { campground: data })  
            });
});

// UPDATE CAMPGROUND
router.put("/:id", checkOwnership, (req, res) => {    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, data) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })
})

// DELETE CAMPGROUND

router.delete("/:id", checkOwnership , (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

// MIDDLEWARE

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkOwnership (req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, data) => {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                if (data.author.id === req.user._id) {                    
                next();
                } else {
                    console.log("need right person")
                    res.redirect("back"); 
                }
            }
        })
    } else {
        res.redirect("back");        
    }
}


module.exports = router;