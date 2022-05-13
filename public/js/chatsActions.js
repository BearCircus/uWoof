// Funcion para obtener los dos arreglos de los chats del usuario loggeado ya sea owner o guest
async function getChats(){

    const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
            "x-auth": sessionStorage.getItem("token")
        }
    });

    const data = await response.json();
    return data;
}

//Funcion obtiene los arreglos de los chats, identifica donde iran y llama la funcion con la estructura html
async function chatsToHtml(data){
    console.log(data);
    let divChats = document.querySelector("ul#chats");
    console.log(divChats);

    divChats.innerHTML = data.ownerChats.map(chat => chatToHTML(chat, true)).join("");
    divChats.innerHTML += data.guestChats.map(chat => chatToHTML(chat, false)).join("");
}

//Funcion que retorna el html que se necesita para que salgan los chats del usuario loggeado
function chatToHTML(chat, owner){
    return `
    <li class="person ${owner ? 'owner' : 'guest'}" data-chat="person1" onclick="selectChat('${chat._id}', owner)"> 
        <div class="user">
            <img src=${chat.idPost.image} alt="Retail Admin">
        </div>
        <p class="name-time">
            <span class="name ${owner ? 'owner' : 'guest'}">${chat.idPost.name} ${chat.idPost.animal}</span>
            <br>
            <span class="time"> Owner: ${chat.idOwner.name}</span>
        </p>
    </li>
`
}

//Funcion que identifica el textarea donde el usuario escribiria el mensaje y realiza la actualizacion del chat con el nuevo mensaje
async function sendNewMessage(){
    let texTarea = document.querySelector("textarea#inputMessage").value;
    console.log(texTarea);

    const resp = await fetch('/api/chat' + sessionStorage.getItem("chatId"), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": sessionStorage.getItem("token")
        },
        body: JSON.stringify(texTarea)
    })

    const result = await resp.json();
    console.log(result);
}

//Funcion que contiene la forma del mensaje del otro usuario en html
function msg_left(chat){
    return `
    <li class="chat-left">
        <div class="chat-avatar">
            <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
            <div class="chat-name">Russell</div>
        </div>

        <div class="chat-text">Actually everything was fine.
            <br>I'm very excited to show this to our team.</div>
        <div class="chat-hour">07:00 <span class="fa fa-check-circle"></span></div>
    </li>
    `
}

//Funcion que contiene la forma del mensaje del usuario loggeado en html
function msg_right(chat){
    return `
    <li class="chat-right">
        <div class="chat-hour">08:59 <span class="fa fa-check-circle"></span></div>
        <div class="chat-text">vamos a ver si este moihrasfhraodhforhfihih hfoadhfsrhfiheri fifdhfi hfoehgriepgh fiensaje se adapta con la nube vamos si jala jala </div>
        <div class="chat-avatar">
            <img src="https://www.bootdey.com/img/Content/avatar/avatar4.png" alt="Retail Admin">
                <div class="chat-name">Jin</div>
        </div>
    </li>
    `
}

//Funcion para organizar las funciones de chat
async function start(){
    let data = await getChats();
    chatsToHtml(data);
    localStorage.setItem("chats", JSON.stringify(data));
}

start();

//todo: guardar el chatId, encontrar el chat del que se quiere actuar y mandarlo
function selectChat(chatId, owner){
    console.log(chatId);
    sessionStorage.setItem("chatId", chatId);

    let data = localStorage.getItem("chats");
    let chats = JSON.parse(data);

    if(owner){
        chats.ownerChats.find(chat => chat._id == chatId);
    }else{
        chats.guestChats.find(chat)
    }

}

//Funcion para crear un chat si no existe al hacer clic a send message
async function processToChat(post_id){

    let ownerId = post_id.userID;
    console.log(ownerId);

    let receptor_id = await getUsersToFind(ownerId);
    console.log(receptor_id);

    await fetch ('/api/chat/' + post_id + '/' + receptor_id, {
        method: 'POST',
        headers: {
            "x-auth": sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    })
}

//Funcion que obtiene todos los usuarios

async function getUsersToFind(ownerId){

}

//Funcion que contiene la esctrucura de los chats con los mensajes (dentro del ul)
async function specificChatHTML(data){
    `
    <div class="selected-user" id="msgTo">
        <span>To: <span class="name">Emily Russell</span></span>
    </div>
                                
    <div class="chat-container">
        <ul class="chat-box chatContainerScroll" id="mensajes">
        
        </ul>
        <div class="form-group mt-3 mb-0">
            <textarea class="form-control" rows="3" id="inputMessage" placeholder="Type your message here..." onsubmit="sendNewMessage()"></textarea>
        </div>
    </div>
    `
}