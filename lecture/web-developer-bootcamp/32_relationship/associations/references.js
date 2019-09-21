const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo2",  { useNewUrlParser: true });

const Post = require("./models/post");

const User = require("./models/user");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob"
// }, (err, data) => {
//     console.log(data)
// })

// Post.create({
//     title: "how to cook",
//     content: "blblblbl"
// }, (err, data) => {
//     console.log(data)
// })

// Post.create({
//     title: "how to cook2",
//     content: "blblblbl"
// }, (err, data) => {
//     User.findOne({email:"bob@gmail.com"}, (err,data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             data.posts.push(data);
//             data.save((err, data) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     });
// })

// Post.create({
//     title: "how to cook3",
//     content: "blblblbl"
// }, (err, data) => {
//     User.findOne({email:"bob@gmail.com"}, (err,data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             data.posts.push(data);
//             data.save((err, data) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     });
// })

User.findOne({email: "bob@gmail.com"}).populate({ path: "posts", model: Post }).exec((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})