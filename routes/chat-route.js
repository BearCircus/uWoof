const express = require("express");
const { mongoose } = require("mongoose");
const { Chat } = require("../db/Chat");
const { Pet } = require("../db/Pet");
const router = express.Router();
//const moment = require("moment");

//Obtiene a partir de un id dos arrays de los chats en los que el usuario aparece en la base de datos (como owner o guest).
router.get('/', async(req, res) => {
    req.userid = "5498498s4fs";
    let chats = await Chat.getChats(req.userid);
    res.send(chats);
})

router.post('/:idPost/:idReceptor', async (req, res) => {
    req.userid = "5498498s4fs";
    let idGuest = "";

    let { msg } = req.body;
    let petDoc = await Pet.getPetById(req.params.idPost);
    let idOwner = petDoc.userID;

    if(req.userid == idOwner){
        idGuest = req.params.idReceptor;
    }else{
        idGuest = req.userid;
    }

    let mensaje = {idSenderUser: req.userid, message: msg, date: Date.now()};
    
    let doc = await Chat.getChat(idOwner, idGuest, req.params.idPost);
    console.log(doc);

    if(doc){
        let nChat = await Chat.update(
            {_id: doc._id},
            { $push: { messages: mensaje } }
        )
        //let nChat = await doc.newMessage(mensaje);
        res.send(nChat);
    }else{
        let newChat = {idOwner, idGuest, idPost, ownerVisibleConversation: true, guestVisibleConversation: true, messages: [mensaje]};
        let nChat = await Chat.newChat(newChat);
        res.send(nChat);
    }
})

//Checa si el Usuario loggeado o el otro usuario del chat quieren ver o no el chat en su pagina de chat
router.put('/deactivate/:idPost/:idReceptor', async (req, res) => {
    req.userid = "5498498s4fs";
    let petDoc = await Pet.getPetById(req.params.idPost);
    console.log(petDoc);

    if(!petDoc){
        res.status(404).send({error: "No se encontro el post"});
    }
    console.log(petDoc.userID);

    let idOwner = petDoc.userID;
    let idGuest = "";

    if(req.userid == idOwner){
        idGuest = req.params.idReceptor;
    }else{
        idGuest = req.userid;
    }

    let doc = await Chat.getChat(idOwner, idGuest, req.params.idPost);

    if(doc){
        let prop = idOwner == req.userid ? "ownerVisibleConversation" : "guestVisibleConversation";
        let doc2 = await Chat.findOneAndUpdate(
            {_id: doc._id},
            { $set: { [prop] : false } },
            {new: true}
        )
        res.send(doc2);
    }else{
        console.log("Conversacion no encontrada");
    }
})


//Elimina mensajes especificos de un chat en especifico debido a su post
router.delete('/:idPost/:idMessage', async (req, res) => {
    let msgToRemove = await Chat.getMessagesFromArray(req.params.idPost, req.params.idMessage);
    if(msgToRemove){
        let nChat = await Chat.update(
            {_id: msgToRemove._id},
            { $pull: { messages : { _id: mongoose.Types.ObjectId(req.params.idMessage)}}}
        )
        res.send(nChat);
    }else{
        res.send("Mensaje no encontrado");
    }
})

module.exports = router;