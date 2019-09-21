const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model("User", userSchema);


// const newUser = new User({
//     email: "test2@sctveb.edu",
//     name: "test2"
// });

// newUser.posts.push({
//     title: "post added test",
//     content: "it's ez"
// });

// newUser.save((err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// const newPost = new Post({
//     title: "Apple",
//     content: "it is delicious"
// });

// newPost.save((err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// User.findOne({name: "test2"}, (err, data) => {
//     if(err) {
//         console.log(err)
//     } else {
//         data.posts.push({
//             title: "additional added",
//             content: "new content"
//         });
//         data.save((err,data) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 console.log(data);
//             }
//         } )
//     }
// })