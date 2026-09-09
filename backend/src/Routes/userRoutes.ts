import { Router } from "express";
import { Response } from "express";
import { UserSchema }  from "../userValidation";
import {UserModel, ContentModel, } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserMiddleware, AuthRequest } from "../middleware";

const userRoutes = Router();

userRoutes.post("/signup", async function(req: AuthRequest, res: Response){
    
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
    } catch(e: any){

        if (e.code === 11000) {
            return res.status(409).json({
                message: "Username or email already in use"
            });
        }

        res.status(500).json({
            message: "Something went wrong!!!!"
        })
    }

});


userRoutes.post("/signin", async function(req: AuthRequest, res: Response){
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }


    try{
        const user = await UserModel.findOne({
            username: username
        });

        if(!user){
            res.status(401).json({
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
            res.status(401).json({
                message: "incorrect credentials"
            })
        }
    }catch(e){
        res.status(500).json({
            message: "something went wrong"
        });
    }

});

userRoutes.get("/content", UserMiddleware, async (req: AuthRequest , res: Response)=>{

    if( !req.userId ){
        console.log("db error");
        res.status(401).json({
            message: "db error"
        });
        return;
    }
    try{
        const userId = req?.userId;
        const content = await ContentModel.find({
            userId: userId,

        }).populate("userId" ,"username")

        res.json({
            content
        })
    }catch(e){
        res.json({
            message: "not authorized"
        })
    }
    
     
});



export default userRoutes;