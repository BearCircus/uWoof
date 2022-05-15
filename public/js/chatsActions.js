// Funcion para obtener los dos arreglos de los chats del usuario loggeado ya sea owner o guest
async function getChats(query) {
  let queryParams = query ? "?name=" + query : "";

  const response = await fetch("/api/chat" + queryParams, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
    },
  });

  const data = await response.json();
  return data;
}

//Funcion obtiene los arreglos de los chats, identifica donde iran y llama la funcion con la estructura html
async function chatsToHtml(data) {
  console.log(data);
  let divChats = document.querySelector("ul#chats");
  console.log(divChats);

  divChats.innerHTML = data.ownerChats
    .map((chat) => chatToHTMLBanner(chat, true))
    .join("");
  divChats.innerHTML += data.guestChats
    .map((chat) => chatToHTMLBanner(chat, false))
    .join("");
}

//Funcion que retorna el html que se necesita para que salgan los chats del usuario loggeado
function chatToHTMLBanner(chat, owner) {
  return `
    <li class="person ${
      owner ? "owner" : "guest"
    }" data-chat="person1" onclick="selectChat('${chat._id}', ${owner})"> 
        <div class="user">
            <img src=${chat.idPost.image} alt="Retail Admin">
        </div>

        <p class="name-time">
            <span class="name ${owner ? "owner" : "guest"}">${
    chat.idPost.name
  } ${chat.idPost.animal}</span>
            <br>
            <span class="time"> Owner: ${chat.idOwner.name}</span>
        </p>
    </li>
`;
}

//todo: guardar el chatId, encontrar el chat del que se quiere actuar y mandarlo
function selectChat(chatId, owner) {
  console.log(chatId);
  sessionStorage.setItem("chatId", chatId);
  let selectedChat = "";
  let chats = JSON.parse(sessionStorage.getItem("chats"));

  if (owner) {
    selectedChat = chats.ownerChats.find((chat) => chat._id == chatId);
  } else {
    selectedChat = chats.guestChats.find((chat) => chat._id == chatId);
  }

  console.log(selectedChat);
  let divMensajesChat = document.querySelector("#chatEspecifico");
  divMensajesChat.innerHTML = specificChatHTML(selectedChat, owner);
}

//Funcion que identifica el textarea donde el usuario escribiria el mensaje y realiza la actualizacion del chat con el nuevo mensaje
async function sendNewMessage() {
  let message = {
    msg: document.getElementById("inputMessage").value,
  };
  console.log(message);

  const resp = await fetch("/api/chat/" + sessionStorage.getItem("chatId"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth": sessionStorage.getItem("token"),
    },
    body: JSON.stringify(message),
  });

  const result = await resp.json();
  console.log(result);
  window.setInterval(location.reload(), 500);
}

async function buscarChat() {
  event.preventDefault();
  let divBuscador = document.getElementById("busqueda").value;
  console.log(divBuscador);
  let data = await getChats(divBuscador);
  chatsToHtml(data);
}

//Funcion para organizar las funciones de chat
async function start() {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  const value = parameters.get("id");
  console.log(value);
  let chatId = "";
  if (value) {
    chatId = await processToChat(value);
  }
  let data = await getChats();
  chatsToHtml(data);
  sessionStorage.setItem("chats", JSON.stringify(data));
  if (chatId) {
    selectChat(chatId, false);
  }
}
start();

//Funcion para crear un chat si no existe al hacer clic a send message
async function processToChat(postId) {
  let resp = await fetch("/api/chat/" + postId, {
    method: "POST",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const chat = await resp.json();
  console.log(chat);
  return chat._id;
  //selectChat(chat._id, false);
}

//Funcion que contiene la esctrucura de los chats con los mensajes (dentro del ul)
function specificChatHTML(chat, owner) {
  let myId = owner ? chat.idOwner._id : chat.idGuest._id;

  return `
    <div class="selected-user" id="msgTo">
        <span><span class="name">${
          chat.idPost.name
        } Pet Conversation</span></span>
    </div>
                                
    <div class="chat-container">
        <ul class="chat-box chatContainerScroll" id="mensajes">
        ${chat.messages
          .map((msg) =>
            msg_html(
              msg,
              msg.idSenderUser == myId ? "right" : "left",
              msg.idSenderUser == chat.idOwner._id ? chat.idOwner : chat.idGuest
            )
          )
          .join("")}
        </ul>
        <div class="form-group mt-3 mb-0">
            <textarea class="form-control" rows="3" id="inputMessage" placeholder="Type your message here..."></textarea>
            <button type="button" class="btn btn-info" onclick="sendNewMessage()">send</button>
        </div>
    </div>
    `;
}

//Funcion que contiene la forma del mensaje del otro usuario en html
function msg_html(msg, side, user) {
  let url =
    "https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

  if (user.image) {
    url = user.image;
  }

  if (side == "left") {
    return `
            <li class="chat-${side}">
                <div class="chat-avatar">
                    <img src=${url} alt="Retail Admin">
                    <div class="chat-name">${user.name} ${user.lastname}</div>
                </div>

                <div class="chat-text">${msg.message}</div>
                <div class="chat-hour">${msg.date} <span class="fa fa-check-circle"></span></div>
            </li>
    `;
  } else {
    return `
            <li class="chat-${side}">
            <div class="chat-hour">${msg.date} <span class="fa fa-check-circle"></span></div>
                <div class="chat-text">${msg.message}</div>

                <div class="chat-avatar">
                    <img src=${url} alt="Retail Admin">
                    <div class="chat-name">${user.name} ${user.lastname}</div>
                </div>
                <button type="button" class="btn btn-outline-info" onclick="deleteMessage(${msg._id})">X</button>
            </li>
    `;
  }
}

async function deleteMessage(msg_id) {
  console.log(msg_id);
  const resp = await fetch("api/chat/" + msg_id, {
    method: "DELETE",
  });

  window.setInterval(location.reload(), 500);
}
