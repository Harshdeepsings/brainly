import mongoose, { model, Schema } from "mongoose";
import { ref, title } from "node:process";
import { lowercase } from "zod";


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
    title: [{type: String, unique: true, trim: true, lowercase: true}],
    
});

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const TagModel = model("Tag", TagSchema);