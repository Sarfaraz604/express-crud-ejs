const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// Middleware
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));


const { v4: uuidv4 } = require("uuid");

// uuidv4();
let posts = [
    {   id: uuidv4(),
        username : "Sarfaraz",
        content: "I love passinating",
    },
    {   id: uuidv4(),
        username:"IIIT Agartala",
        content:"Will be known by my Name",
    },
    {   id: uuidv4(),
        username:"BabuSarfaraz",
        content:"I got my first internship Offer From Google",
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});
app.post("/posts",(req,res) =>{
//    console.log(req.body);
let id = uuidv4();
let {username,content} = req.body;
posts.push({id,username,content});
//    res.send("post request is working");
   res.redirect("/posts");
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // res.send("request working");
    // console.log(post);
    res.render("show.ejs",{post});
});

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.patch("/posts/:id",(req,res) => {
    let {id} =req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(id);
    res.redirect("/posts");
    // res.send("patch request working");
});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});
app.listen(port, () => { 
    console.log(`App is listening on port ${port}`);
});
