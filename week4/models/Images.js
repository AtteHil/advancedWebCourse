const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let imageSchema = new Schema({
    buffer: Buffer,
    encoding: String,
    mimetype: String,
    name: String,
    
});
module.exports = mongoose.model("image", imageSchema);