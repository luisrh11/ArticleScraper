var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// the schema for the comment has a name and a body
var CommentSchema = new Schema({
    name: String,
    body: String
});
// creates model with mongoose
var Comment = mongoose.model("Comment", CommentSchema);
// exporting comment
module.exports = Comment;