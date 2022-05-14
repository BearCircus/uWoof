const express = require("express");
const { mongoose } = require("mongoose");
const { Chat } = require("../db/Chat");
const { Pet } = require("../db/Pet");
const { User } = require("../db/User");
const router = express.Router();
const {auth} = require("../middlewares/auth");
//const moment = require("moment");

//Obtiene a partir de un id dos arrays de los chats en los que el usuario aparece en la base de datos (como owner o guest)
router.get('/', auth, async(req, res) => {
    let chats = await Chat.getChats(req._id);
    res.send(chats);
})

router.post('/:idPost/:idReceptor', auth, async(req, res) => {
    let petDoc = await Pet.findById(req.params.idPost);
    console.log(petDoc);

    let pet = JSON.parse(JSON.stringify(petDoc));
    console.log(pet);
    console.log(pet.userID);


    let userDoc = await User.findOne({id: pet.userID});

    let idOwner = userDoc._id;
    let idGuest = "";

    if(req._id == idOwner){
        idGuest = req.params.idReceptor;
    }else{
        idGuest = req._id;
    }

    let doc = await Chat.getChat(idOwner, idGuest, req.params.idPost);

    if(!doc){
        let newChat = {idOwner, idGuest, idPost: req.params.idPost, ownerVisibleConversation: true, guestVisibleConversation: true, messages: []};
        let nChat = await Chat.newChat(newChat);
        res.send(nChat);
    }else{
        res.send(doc);
    }
})


router.put('/:idChat', auth,  async (req, res) => {

    let chatDoc = await Chat.findById(req.params.idChat);

    if(chatDoc){
        let { msg } = req.body;
        let fechaCompu = Date.now();
        let fecha = fechaCompu.toLocaleString();

        let mensaje = {idSenderUser: req._id, message: msg, date: fecha};
    
        let nMsg = await Chat.findOneAndUpdate(
            {_id: chatDoc._id},
            { $push: { messages: mensaje } },
            {new: true}
        )
        res.send(nMsg);
    }else{
        res.status(404).send({error: "No se encontro el chat"});
    }
})

//Checa si el Usuario loggeado o el otro usuario del chat quieren ver o no el chat en su pagina de chat
router.put('/deactivate/:idPost/:idReceptor', auth, async (req, res) => {
    let petDoc = await Pet.findById(req.params.idPost);
    console.log(petDoc);

    if(!petDoc){
        res.status(404).send({error: "No se encontro el post"});
    }

    let userDoc = await User.findOne({userID: petDoc.userID});
    console.log(userDoc);

    let idOwner = userDoc._id;
    let idGuest = "";

    if(req._id == idOwner){
        idGuest = req.params.idReceptor;
    }else if(idOwner == req.params.idReceptor){
        idGuest = req._id;
    }else{
        console.log("Hemos tenido un error de identificadores");
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
router.delete('/:idMessage', async (req, res) => {
    console.log(req.params.idMessage);
    let msgToRemove = await Chat.getMessageFromArray(req.params.idMessage);
    console.log(msgToRemove);

    let msg_id = msgToRemove._id;


    if(msgToRemove){
        let removeMsg = await Chat.findOneAndUpdate(
            {_id: msg_id},
            { $pull: { messages : { _id: mongoose.Types.ObjectId(req.params.idMessage)}}},
            {new: true}
        )
        res.send(removeMsg);
    }else{
        res.send("Mensaje no encontrado");
    }
})

module.exports = router;