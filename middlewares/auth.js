const { jwt } = require("jsonwebtoken");

function auth(req,res,next){
    let token = req.get('x-auth');
    if(token){
        jwt.verify(token,process.env.TOKEN_KEY,(err,payload)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    res.status(401).send({error: "Token expiro, vuelve a loguearte"})
                }else{
                    res.status(401).send({error: "Token no valido"})
                }
                return;
            }
            //console.log(payload.email);;
            req.userId = payload.id;
            req.email = payload.email;
            next();
        })
        //console.log(token);
        req.userId = token;
        next();
    }else{
        res.status(401).send({error: "no autenticado"})
        return;
    }
}

module.exports = {auth}