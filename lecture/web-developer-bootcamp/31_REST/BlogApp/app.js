const express = require('express'),
mongoose = require('mongoose'),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
app = express();

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
const blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
})
const Blog = mongoose.model("Blog", blogSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Blog.create({
//     title: "kanetv",
//     image: "https://yt3.ggpht.com/a/AGF-l7-qwNxDtWNaFdmu5gs-ZisCfr2XBN_GPEblDw=s900-c-k-c0xffffffff-no-rj-mo",
//     body: "Hi, 케인인님 한판해요"
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// });

app.get("/", (req,res) => {
    res.redirect("/blogs")
});

app.get("/blogs", (req, res) => {    
    Blog.find({}, (err, data) => {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("index", { blogs: data });
        }
    })
});

app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, data) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.get("/blogs/:id", (req,res) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: data})
        }
    })
});

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, data) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: data})
        }
    })
});

app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, data) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`)
        }
    })
})

app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            alert("삭제되지 않았습니다!")
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(3000, () => {
    console.log("server is running on 3000")
});