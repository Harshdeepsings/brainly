import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
 

export function UserMiddleware(req: Request, res: Response, next: NextFunction){
    const header = req.headers["authorization"];
    if(!header){
        res.status(401).json({
            message: "no token provided"
        });
    }

    try{
        const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    
    }catch(err){
        res.status(401).json({
            message: "invalid or expired token"
        });
    }
}