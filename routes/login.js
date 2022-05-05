const { User } = require("../db/User");
const jwt = require("jsonwebtoken");
const router = require("express").Router()
const bcrypt = require("bcryptjs")

router.post('/',async(req,res)=>{
   let {email,password} = req.body;
   let doc = await User.findOne({email})
   //console.log(doc)
   
   if(doc){
       //console.log(doc.password);
       let result = bcrypt.compareSync(password, doc.password);
       //console.log(result);
       if(result){
           //console.log("Segundo if")
           //Todo: generar token
           let token = jwt.sign({id: doc.id, email},process.env.TOKEN_KEY, { expiresIn: 60*5 },)
        res.send({token})
      }else{
          res.status(400).send({error: "Password Incorrecto"})
      }
   }else{
       res.status(404).send({error: "Usuario No Existe"})
   }
})
module.exports = router;