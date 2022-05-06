const { mongoose } = require("./connectDataBase");
//const moment = require("moment");
const { nanoid } = require("nanoid");

let chatsSchema = mongoose.Schema({
    idOwner: {
        type: String,
        required: true,
    },

    idGuest: {
        type: String,
        required: true,
    },

    idPost: {
        type: String,
        required: true
    },

    ownerVisibleConversation: {
        type: Boolean,
        required: true
    },

    guestVisibleConversation: {
        type: Boolean,
        required: true
    },

    messages: [{
        idSenderUser: {
            type: String,
            required: true
        },

        message: {
            type: String
        },

        date: {
            type: String
        }
    }]
})

//Funcion para obtener todos los chats del usuario como user y como owner
chatsSchema.statics.getChats = async(idLog) => {
    let ownerChats = await Chat.find({ idOwner: idLog });
    let guestChats = await Chat.find({ idGuest: idLog });
    return {ownerChats, guestChats};
}

//Funcion para obtener una conversacion del usuario, para los mensajes
chatsSchema.statics.getChat = async(idOwner, idGuest, idPost) => {
    return await Chat.findOne({ idOwner, idGuest, idPost });
}

//Funcion para obtener un chat en especifico por busqueda del post y del usuario cuando es owner

//Funcion para obtener un chat en especifico por busqueda del post y del usuario cuando es guest

//Funcion para crear un chat nuevo
chatsSchema.statics.newChat = async(obj) => {
    let chatToCreate = Chat(obj);
    return await chatToCreate.save();
}

chatsSchema.statics.getMessagesFromArray = async(idPost, idMsg) => {
    return await Chat.findOne({"messages._id": idMsg});
}

const Chat = mongoose.model("chats", chatsSchema);

//pruebas con funciones asincronas

// async function getMessagesFromArray(){
//     let mensaje = await Chat.findOne({"messages._id": "62719acf78c61881554a37c0"});
//     if(mensaje){
//         console.log(mensaje);
//     }else{
//         console.log("Error");
//     }
// }

// async function getChat(){
//     let mensaje = await Chat.find({idGuest: "5498498s4fs"});
//     if(mensaje){
//         console.log(mensaje);
//     }else{
//         console.log("Error");
//     }
// }
//getChat();

async function getSpecificChatOwner(){
    let chat = await Chat.findOne({idOwner: "5498498s4fs", idPost: "post 5000"});
    if(chat){
        console.log(chat);
    }else{
        console.log("No se encontro el chat");
    }
}

getSpecificChatOwner();

async function getSpecificChatGuest(){
    let chat = await Chat.findOne({idGuest: "5498498s4fs", idPost: "post 91"});
    if(chat){
        console.log(chat);
    }else{
        console.log("No se encontro el chat");
    }
}

module.exports = { Chat };