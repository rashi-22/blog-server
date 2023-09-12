const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

let Blog = new Schema({
    title: String,
    author: String,
    description: String,
    content: String,
    date_created: Date,
    is_delete: Boolean
});

const model = mongoose.model("Blog", Blog)

module.exports = model;