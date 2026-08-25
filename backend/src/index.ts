import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {UserModel, ContentModel } from "./db";
import { UserSchema }  from "./userValidation";
import bcrypt from "bcrypt";
import { UserMiddleware } from "./middleware";


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string);


app.post("/signup", async function(req, res){
    
    const parsedDataWithSuccess = UserSchema.safeParse(req.body);

        if(!parsedDataWithSuccess.success){
            res.status(400).json({
                message: "incorrect format",
                error: parsedDataWithSuccess.error
            })
            return
        }

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const hashedpassword = await bcrypt.hash(password, 10);
        try{
        await UserModel.create({
            username: username,
            password: hashedpassword,
            email: email
        })

        res.status(200).json({
            message: "You are signed up"
        })
    } catch(e){
        res.json({
            message: "Something went wrong!!!!"
        })
    }

});

app.post("/signin", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;


    const user = await UserModel.findOne({
        username: username
    });

    if(!user){
        res.json({
            message: "invalid credentials"
        })
        return
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_SECRET as string);

        res.json({
            token
        })

    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

});

app.get("/content", UserMiddleware, async (req, res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId,

    }).populate("userId" ,"username")

    res.json({
        content
    })
     
});

app.post("/content", UserMiddleware, (req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    ContentModel.create({
        link,
        //@ts-ignore
        userId: req.userId,
        tags: []

    })

    res.json({
        message: "content added"
    })
   
});

app.delete("/content", async (req, res)=>{
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "content deleted"
    })
    
});

app.listen(3000);