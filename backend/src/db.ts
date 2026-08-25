import mongoose, { model, Schema } from "mongoose";
import { ref } from "node:process";


const UserSchema = new Schema({
    username : { type: String, unique: true, required: true},
    password : { type: String, required: true},
    email : { type: String, unique: true, required: true}
});

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    

});

const TagSchema = new Schema({
    ContentId: {type: mongoose.Types.ObjectId, ref: 'Content'}
});

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const TagModel = model("Tag", TagSchema);