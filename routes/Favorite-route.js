const express = require("express");
const router = express.Router();
const shortid = require("shortid");

const { Favorite } = require("./Favorite");


//const {auth} = require("/middlewares")


//FALTA MIDDLEWARE
router.get('/', async (req,res)=>{
    console.log(req.query);

    req.userID = '626c7fd9fc04a3df7acbefcf'; //Middleware, borra eso cuando ya tengas middleware
    let doc = await Favorite.getFavorites(req.userID);
    console.log(doc);
    let {publication, id, comment, name} = req.query;
    let filtro = doc.favorites;

    
    if(publication){
        filtro = filtro.filter(fav => fav.publication.toUpperCase().includes(publication.toUpperCase()));
    }
    if(id){
        filtro = filtro.filter(fav => fav.id.toUpperCase().includes(id.toUpperCase()));
    }
    if(comment){
        filtro = filtro.filter(fav => fav.comment.toUpperCase().includes(comment.toUpperCase()));
    }
   
    if(name){
        console.log(filtro);
        filtro = filtro.filter(fav => {
           
            let f = JSON.parse(JSON.stringify(fav.publication));
            console.log(f);
            console.log(f.name);

            
            return f.name.toUpperCase().includes(name.toUpperCase());
        })
    }

    res.send(filtro);

    
})

router.get('/:id', async (req,res)=>{
    
    req.userID = '626c7fd9fc04a3df7acbefcf';
    console.log(req.params.id);
    let favorite = await Favorite.getFavorites(req.userID); //  favorite.find(fav => fav.id == req.params.id)
    if(favorite){

        res.send(favorite)
    }else{
        res.status(404).send({error: " no encontrado"})
    }
})

module.exports = router;