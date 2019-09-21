const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const app = express();
const Campground = require('./models/Campground');
const Comment = require('./models/Comment');
const User = require('./models/User');
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// ---------------------------
// CAMPGROUND ROUTES
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
  next();
})

// INDEX
app.get("/", (req, res) => {
  res.render("landing");
});

// ---------------------------
// CAMPGROUND ROUTES

// INDEX CAMPGROUND
app.get("/campgrounds", (req, res) => {
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

// NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// SHOW CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("campgrounds/show", { campground: data });
    }
  });
});

// ---------------------------
// COMMENT ROUTES

// NEW COMMENT
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: data});
    }
  })
  
}) 

// CREATE COMMENT
app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

// ---------------------------
// AUTH ROUTES
app.get("/register", (req, res) => {
  res.render("register");
})

app.post("/register", (req, res) => {
  const newUser = new User({username: req.body.username});
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

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {

})

app.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, () => {
  console.log("3000 port used by express");
});
