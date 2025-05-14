const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: "Not Authenticated"});
    }
    try {
        const decoded = req.jwt.token
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({ error : "Invalid Token "});
    }
};

module.exports = authMiddleware;
