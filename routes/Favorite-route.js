//const e = require("express");
const express = require("express");
const router = express.Router();
const {nanoid} = require("nanoid");
const { Pet } = require("../db/Pet");
const { Favorite } = require("../db/Favorite");
const {auth} = require("../middlewares/auth")


//FALTA MIDDLEWARE
/*router.get('/', auth, async (req,res)=>{
    console.log(req.query);

    //req.userID = '62719b8c9b009ec84c73a8d6'; //Middleware, borra eso cuando ya tengas middleware
    let doc = await Favorite.getFavorites(req.userID);
    console.log(doc);
    if(!doc || !doc.favorites){
        res.send([])
    return}
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
})*/

router.get('/', auth, async (req,res)=>{
    
    
    let favorite = await Favorite.getFavorites(req._id);
    if(favorite){

        res.send(favorite)
    }else{
        res.status(404).send({error: " no encontrado"})
    }
})

router.delete('/:favID', auth, async (req, res)=>{

    //console.log("delete");
    //console.log(req._id);
    
    let doc = await Favorite.getdoc(req._id);
    //console.log(doc);

    if(doc){
        
        let f = await Favorite.updateOne( 
            { userID: req._id},
            {
                $pull: {
                    favorites: { _id : req.params.favID}
                }
                
            })
        
        res.status(200).send("Se borró con exito")
             
    }
    else{
        res.status(404).send({error: "no se encontró esa publicación"})
        
    }
})

router.post('/:favID', auth, async (req,res)=>{

    //req.userID = '62719b8c9b009ec84c73a8d6'

    let {comment} = req.body;
    comment = !comment?"":comment;

    let favorite = { publication: req.params.favID, id: nanoid(), comment: comment};

    let userDoc = await Favorite.getdoc(req._id);
    let favDoc = await Pet.findOne({_id: req.params.favID});

    if(userDoc && favDoc){
        let pos = userDoc.favorites.findIndex(fav => fav._id == req.params.favID);
        if(pos==-1){
            let newFav = await Favorite.updateOne(
                {userID: req._id},
                {
                    $push: {favorites: favorite}
    
                }
            )
            res.send(newFav);
        }else{
            userDoc.favorites[pos].comment = comment;
            let update = userDoc.updateData(userDoc);
            res.send(update);
        }
         
    }
    else if(!userDoc && favDoc){
        let newFav = {userID: req._id, favorites: [favorite]}
        let newUserFav = await Favorite.crearFavorites(newFav);
        res.send(newUserFav);
    }
    else if(!favDoc){
        res.status(404).send({error: "No se encontró la publicación"})
        

    }
    else{
        res.status(404).send({error: "No se encontró el usuario"})
    }
 
})

module.exports = router;