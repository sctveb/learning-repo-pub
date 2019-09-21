const express = require("express");
const router = express.Router({ mergeParams: true });

const Campground = require("../models/Campground");
const Comment = require("../models/Comment");

const middleware = require("../middlewares");
// ---------------------------
// COMMENT ROUTES

// NEW COMMENT
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
                    req.flash("error", "something wend wrong")
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.flash("success", "Successfully added comment")
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    })
})

// EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, data) => {
        if (err) {
            req.flash("error", "something wend wrong")
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: data});
        }
    })

});

// UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, data) => {
        if (err) {
            req.flash("error", "something wend wrong")
            res.redirect("back");
        } else {
            console.log(data);
            res.flash("success", "Comment updated")
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })
})

// DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {    
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            res.flash("success", "Comment deleted")
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})

module.exports = router;