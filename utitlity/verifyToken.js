const jwt = require('jsonwebtoken');
module.exports={
verifyToken:function(req,res,next){

    let token = req.body.token;


    try{
    let result = jwt.verify(token,'secretKey');
    console.log("result",result);
    next();
    }
    catch(err){
        res.json({
            "msg":"Invalid JSON WEB TOKEN"
        });
    }
    

}
};