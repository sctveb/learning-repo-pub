const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/User");

// INDEX
router.get("/", (req, res) => {
    res.render("landing");
});

// ---------------------------
// AUTH ROUTES
router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        })
    })
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {

})

router.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/campgrounds");
})

module.exports = router;