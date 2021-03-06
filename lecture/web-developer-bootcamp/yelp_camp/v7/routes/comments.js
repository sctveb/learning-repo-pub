const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/Campground");
const Comment = require("../models/Comment");
// ---------------------------
// COMMENT ROUTES

// NEW COMMENT
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: data });
        }
    })

})

// CREATE COMMENT
router.post("/", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;