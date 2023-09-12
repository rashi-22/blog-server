const express = require("express");
const cors = require("cors")
const Auth = require("./models/middleware")
const {addUser, login} = require("./routes/userRoutes.js")
const { upsertBlog, deleteBlog, fetchBlogs } = require("./routes/blogRoutes.js")
const { addLikes } = require("./routes/blogLikesRoutes")
const { addBlogComments } = require("./routes/blogCommentsRoutes.js")

const app = express();

const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/blogDb",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(express.json())

app.use(bodyParser.urlencoded({ extended:true}));

app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.post("/add-user",addUser);
app.post("/login",login);

app.post("/upsertBlog", Auth.verifyToken, upsertBlog);
app.post("/deleteBlog", Auth.verifyToken, deleteBlog);
app.post("/fetchBlogs", Auth.verifyToken, fetchBlogs)

app.post("/addLikes", Auth.verifyToken, addLikes);
app.post("/addBlogComments", Auth.verifyToken, addBlogComments);

app.listen(3001, () => {
    console.log("server is running on port 3001")
})

module.export = app;