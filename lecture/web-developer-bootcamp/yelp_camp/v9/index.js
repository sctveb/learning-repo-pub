const express = require("express");
const expressSession = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");

const app = express();

const Campground = require('./models/Campground');
const Comment = require('./models/Comment');
const User = require('./models/User');

const indexRoutes = require("./routes/index");
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");

const middleware = require("./middlewares");

const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v9", { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// ---------------------------
// PASSPORT CONFIGURATION
app.use(expressSession({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, () => {
  console.log("3000 port used by express");
});
