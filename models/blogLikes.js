const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

let BlogLikes = new Schema({
    user_id: String,
    blog_id: String,
    date_created: Date
});

const model = mongoose.model("BlogLikes", BlogLikes)

module.exports = model;