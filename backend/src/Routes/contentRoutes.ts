import { Router } from "express";
import { Response } from "express";
import { UserMiddleware, AuthRequest } from "../middleware";
import { ContentModel } from "../db";


const contentRoutes = Router();

contentRoutes.post("/post", UserMiddleware, async(req: AuthRequest, res: Response)=>{
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    

    try{

        if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

        await ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []

        })

        res.json({
            message: "content added"
        })
    }catch(e){
        res.json({
            message: "not authorized"
        })
    }

   
});

contentRoutes.delete("/delete", UserMiddleware, async (req: AuthRequest, res: Response)=>{
    const contentId = req.body.contentId;

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if (!contentId) {
        return res.status(400).json({
            message: "contentId is required"
        });
    }

    try{
        const deleted = await ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        })

        if (deleted.deletedCount === 0) {
            return res.status(404).json({ 
                message: "Content not found or unauthorized" 
            });
        }

        res.json({
            message: "content deleted"
        })
    }catch(e){
        res.json({
            message: "not authorized"
        })
    }
    
});


export default contentRoutes;