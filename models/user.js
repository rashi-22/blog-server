const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const model = mongoose.model("User", User)

module.exports = model;