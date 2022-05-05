const express = require("express");
const { mongoose } = require("mongoose");
const { Chat } = require("../db/Chat");
const router = express.Router();
//const moment = require("moment");

// 1. Get de chats de un usuario (todos)
// 2. get chat especifico para manipularlo
// 3. post nuevo chat si no existia
// 4. post nuevo mensaje porque el chat ya existia y se debe actualizar
// 5. delete para borrar un chat especifico
// 6. delete para un mensaje especifico

router.get('/', async(req, res) => {
    req.userid = "5498498s4fs";
    let chats = await Chat.getChats(req.userid);
    res.send(chats);
})

router.post('/', async (req, res) => {
    req.userid = "5498498s4fs";
    let idGuest = "";

    let {idReceptor, idPost, msg} = req.body;
    //let idOwner = Pet.getIdOwnerPost(idPost);

    let idOwner = "5498498s4fs"; // harcodeado


    if(req.userid == idOwner){
        idGuest = idReceptor;
    }else{
        idGuest = req.userid;
    }

    let mensaje = {idSenderUser: req.userid, message: msg, date: Date.now()};
    
    let doc = await Chat.getChat(idOwner, idGuest, idPost);
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

router.put('/:idPost', async (req, res) => {
    req.userid = "5498498s4fs";
    let {idOwner, idGuest} = req.body;

    if(idOwner == req.userid){
        let doc = await Chat.getChat(req.userid, idGuest, req.params.idPost);
        if(doc){
            doc.ownerVisibleConversation = false;
        }else{
            console.log("Conversacion no encontrada");
        }
    }else{
        let doc = await Chat.getChat(idOwner, req.userid, req.params.idPost);
        if(doc){
            doc.guestVisibleConversation = false;
        }else{
            console.log("Conversacion no encontrada");
        }
    }
})

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