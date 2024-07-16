const express = require("express");
const app = express();
const port = 8080;
const path  = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "rahul!",
        content : "hey guys! whats up! glad to be here on this site.",
    },
    {
        id : uuidv4(),
        username : "vivek",
        content : "welcome to quora posts! hope you have a good experience!",
    },
    {
        id : uuidv4(),
        username : "tanya",
        content : "hello theree!",
    },
];


// GET REQUEST (INDEX) (index.ejs)
app.get("/posts",(req,res) => {
    res.render("index.ejs", {posts});
});

// POST REQUEST (CREATE) (2 ROUTES) 1. Serve the form (new.ejs)
app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

//2. When form is submitted , new post is added.
app.post("/posts",(req,res) => {
    let {username , content } = req.body;
    let id = uuidv4();
    posts.push({id ,username, content});
    res.redirect("/posts");
});

// GET REQUEST (VIEW) To view a single post. (show.ejs)
app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

// PATCH REQUEST (UPDATE) To update a specific post.
app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// GET REQUEST (EDIT) To edit a specific post.
app.get("/posts/:id/edit" , (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// DELETE REQUEST (DESTROY) To delete a specific post. (DELETE request is executed with the help of method-override package)
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,() => {
    console.log("app is listening to port : 8080");
})