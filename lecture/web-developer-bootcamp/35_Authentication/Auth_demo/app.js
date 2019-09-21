const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -----------------
// ROUTES

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
})

// -----------------
// AUTH ROUTES

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret")
        })
    })
})

// -----------------
// LOGIN ROUTES

app.get("/login", (req, res) => {
    res.render("login")
});

// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login',
}), (req, res) => {
    
});

app.get("/logout", (req, res) => {
    req.Logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login')
    }
}

app.listen(3000, () => {
    console.log("server started at 3000 port")
})