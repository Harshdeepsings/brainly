
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    username : String,
    password : String,
    email : String
});

const content = new Schema({
    userId : ObjectId,
    type : String

});

const userModel = mongoose.model("user", user);
const contentModel = mongoose.model("content", content);

module.exports={
    userModel,
    contentModel
};