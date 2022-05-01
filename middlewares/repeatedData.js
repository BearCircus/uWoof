const { User } = require("../db/User");

async function checkUsername(req, res, next){
    let {username} = req.body;

    let doc = await User.findOne({username})
    if(doc){
        res.status(400).send({error: "Username ya existe"})
    }else{
        next();
    }
}

async function checkEmail(req, res, next){
    let {email} = req.body;

    let doc = await User.findOne({email})
    if(doc){
        res.status(400).send({error: "Email ya utilizado"})
    }else{
        next();
    }
}

module.exports = {checkUsername,checkEmail};

