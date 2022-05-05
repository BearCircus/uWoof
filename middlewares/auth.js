const jwt = require("jsonwebtoken");
//const { User } = require("../db/User");

function auth(req,res,next){
    let token = req.get('x-auth');
    if(token){
        //console.log(token);
        jwt.verify(token,process.env.TOKEN_KEY,(err,payload)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    res.status(401).send({error: "Token expiró, vuelve a loguearte"})
                }else{
                    res.status(401).send({error: "Token no válido"})
                }
               
                // console.log(err);
                // console.log(err.name);
                return;
            }
            //console.log(payload.email);
            req.userId = payload.id;
            req.email = payload.email;
            next();
        }) 
    }else{
        res.status(401).send({error: "no autenticado, falta token"})
        return;
    }
}

module.exports = {auth}