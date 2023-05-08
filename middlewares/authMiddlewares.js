const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        const token = await req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
            if(err){
                res.status(201).send({success : false, message : `Error in authMiddleware verification : ${err}`});
            }else{
                req.body.userId = decode.id ;
                next();
            }
        })
    }catch(error){
        res.status(500).send({success : false, message : `Error in authMiddlewares ${error.message}`.bgRed});
    }
}