import { Router } from "express";
import { Response } from "express";
import { UserMiddleware, AuthRequest } from "../middleware";
import {UserModel, ContentModel, LinkModel } from "../db";
import { random } from "../utils";

const shareRoutes = Router();

shareRoutes.post("/share", UserMiddleware, async (req: AuthRequest, res: Response) => {
    const share = req.body.share;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try{

        if(share){
            const linkExists = await LinkModel.findOne({
                userId: req.userId
            });
            if (linkExists){
                res.json({
                    message: linkExists.hash
                })
                return;
            }
            
            const newhash = random(15);
            await LinkModel.create({
                userId: req.userId,
                hash: newhash
            })
        

            res.json({
                hash: newhash
            });
        }else{
            await LinkModel.deleteOne({ userId: req.userId });
                return res.json({
                    message: "Share link disabled"
                });
            };
    
    }catch(e){
        res.json({
        message: "not authorized"
        });
    }
});

shareRoutes.get("/:sharelink", async (req: AuthRequest, res: Response) => {
    const hash = req.params.sharelink;

    try{
        if(typeof hash !== "string"){
            return res.status(400).json({
                message: "Invalid hash"
            });
        }

        const link = await LinkModel.findOne({
            hash: hash
        })

        if(!link){
            res.status(411).json({
                message: "Incorrect Input"
            });
            return;
        }

        const content = await ContentModel.find({
            userId: link.userId
        })

        const user = await UserModel.findOne({
            _id: link.userId
        })

        res.json({
            username: user?.username,
            content: content
        })
    }catch(e){
        res.json({
            message: "not authorized"
        })
    }

});


export default shareRoutes;