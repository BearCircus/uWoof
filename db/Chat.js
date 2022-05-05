const { mongoose } = require("./connectDataBase");
const moment = require("moment");
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

//Funcion para crear un chat nuevo
chatsSchema.statics.newChat = async(obj) => {
    let chatToCreate = Chat(obj);
    return await chatToCreate.save();
}


//Funcion para agregar mensaje nuevo en un chat ya creado o actualizar conversacion
// chatsSchema.methods.newMessage = async(message) => {
//     console.log(this);
//     this.messages.push(message);
//     console.log(this.messages);
//     this.save(done);
// }

chatsSchema.statics.getMessagesFromArray = async(idPost, idMsg) => {
    return await Chat.findOne({"messages._id": idMsg});
}



const Chat = mongoose.model("chats", chatsSchema);

// async function newConversation() {
//     let newChat = {
//         idOwner: "otraaaaaa",
//         idGuest: "denuevootraaa",
//         idPost: "post 1495",
//         ownerVisibleConversation: true,
//         guestVisibleConversation: true,
//         messages: [{
//             idSenderUser: "denuevootraaa",
//             message: "que tal",
//             date: moment().subtract(10, 'days').calendar()
//         }]
//     }

//     let msgs = Chat(newChat);

//     let resp = await msgs.save();
//     console.log(resp);
// }
// newConversation();

// async function getChats() {
//     let chats = await Chat.find({ idUser: "LQ9PKfa_XrCUwe4jqtXKD" });
//     console.log(chats);
// }
// //getChats();

// async function getMessages() {
//     let chats = await Chat.find({ idUser: "LQ9PKfa_XrCUwe4jqtXKD", idOwnerPost: "jskfjañsjfjfjdjf", idPost: "post 12" }, { messages: 1 });
//     console.log(chats);
// }
// //getMessages();

// async function getSpecificChat(){
//     let doc = await Chat.findOne({idOwner: "12151sdaf", idGuest: "5498498s4fs", idPost: "post 91"});
//     if(doc){
//         console.log(doc);
//     }else{
//         console.log("Error");
//     }
// }
// getSpecificChat();

async function getMessagesFromArray(){
    let mensaje = await Chat.findOne({"messages._id": "62719acf78c61881554a37c0"});
    if(mensaje){
        console.log(mensaje);
    }else{
        console.log("Error");
    }
}

async function getChat(){
    let mensaje = await Chat.find({idGuest: "5498498s4fs"});
    if(mensaje){
        console.log(mensaje);
    }else{
        console.log("Error");
    }
}

//getChat();

module.exports = { Chat };