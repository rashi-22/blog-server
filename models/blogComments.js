const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

let BlogComments = new Schema({
    user_id: String,
    blog_id: String,
    comment: String,
    date_created: Date
});

const model = mongoose.model("BlogComments", BlogComments)

module.exports = model;