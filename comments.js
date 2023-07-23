// Create web server application in express JS
const express = require("express");
const app = express();
const port = 3000;

// Create a list of comments
const comments = [
    {
        id: 1,
        username: "todd",
        comment: "lol that is so funny!",
    },
    {
        id: 2,
        username: "sk8erBoi",
        comment: "Plz delete your account, Todd",
    },
    {
        id: 3,
        username: "onlysayswoof",
        comment: "woof woof woof",
    },
];

// Use the express.static() method to serve files from the public folder
app.use(express.static("public"));

// Use the express.urlencoded() method to parse data coming from POST requests
app.use(express.urlencoded({ extended: true }));

// Use the express.json() method to parse data coming from POST requests
app.use(express.json());

// Use the app.get() method to handle GET requests
app.get("/comments", (req, res) => {
    res.json(comments);
});

// Use the app.post() method to handle POST requests
app.post("/comments", (req, res) => {
    const newComment = {
        id: comments.length + 1,
        username: req.body.username,
        comment: req.body.comment,
    };
    comments.push(newComment);
    res.json(newComment);
});

// Use the app.get() method to handle GET requests
app.get("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find((comment) => comment.id === id);
    res.json(comment);
});

// Use the app.put() method to handle PUT requests
app.put("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find((comment) => comment.id === id);
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.json(comment);
});

// Use the app.delete() method to handle DELETE requests
app.delete("/comments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    comments.splice(commentIndex, 1);
    res.json({ msg: `Comment ${id} deleted` });
});

// Use the app.listen() method to start the server on port 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Test the server by running the following command in the terminal:
// curl http://localhost:3000/comments
// curl http://localhost:3000/comments/1
// curl -X POST -H "Content-Type: application/json" -d '{"username":"todd","comment":"lol that is so funny!"}' http://localhost:3000/comments
// curl -X PUT -H "Content-Type: application/json" -d '{"username":"todd","comment":"lol that is so funny!"}' http://localhost:3000/comments/1
// curl -X DELETE http://localhost:3000/comments/1
