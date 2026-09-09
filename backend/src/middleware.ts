import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    userId?: string
}

interface JwtPayload {
    id: string
}
 

export function UserMiddleware(req: AuthRequest, res: Response, next: NextFunction){

     
    const header = req.headers["authorization"];

    if(!header){
        res.status(401).json({
            message: "no token provided"
        });
        return;
    }

    

    try{
        
        const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string) as JwtPayload;
        
        req.userId = decoded.id;
        next();
    
    }catch(err){
        res.status(401).json({
            message: "invalid or expired token"
        });
    }
}