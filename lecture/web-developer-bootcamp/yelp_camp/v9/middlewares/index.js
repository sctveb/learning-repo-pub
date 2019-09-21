const Campground = require('../models/Campground');
const Comment = require('../models/Comment');

const middlewareObj = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login");
    },
    checkCampgroundOwnership: function (req, res, next) {
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, data) => {
                if (err) {
                    req.flash("error", "Campground not found")
                    res.redirect("/campgrounds");
                } else {
                    if (data.author.id === req.user._id) {                    
                    next();
                    } else {
                        req.flash("error", "You don't have permission to do that")
                        res.redirect("back"); 
                    }
                }
            })
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");        
        }
    },
    checkCommentOwnership: function (req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, data) => {
                if (err) {
                    res.redirect("back");
                } else {
                    if (data.author.id.equals(req.user._id)) {                    
                    next();
                    } else {
                        res.redirect("back"); 
                    }
                }
            })
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");        
        }
    }
}

// 이전엔 객체 외부에서 함수는 재정의해야 했음.

module.exports = middlewareObj;