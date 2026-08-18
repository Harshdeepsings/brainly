const jwt = require("jsonwebtoken");

export function auth(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            message: "no token provided"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json({
            message: "invalid or expired token"
        });
    }
}