const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TodosSchema = new Schema({
    user: String,
    items: [String]
});





module.exports = mongoose.model("Todo", TodosSchema)