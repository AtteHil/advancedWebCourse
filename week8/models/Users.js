const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    email: String,
    password: String
});





module.exports = mongoose.model("user", UsersSchema)