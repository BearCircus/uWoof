async function getChats(query){
    const response = await fetch('http://127.0.0.1:5500/uWoof/public/Chat/messages.html', {
        method: 'GET'
    });

    const data = await response.json();
    return data;
}

async function chatsToHtml(data){
    let divChats = document.querySelector("ul#chats");
    console.log(divChats);

    divChats.innerHTML = data.map(chat => `
        <li class="person" data-chat="person1">
            <div class="user">
                <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
            </div>
            <p class="name-time">
                <span class="name">${chat.}</span>
                <span class="time">15/02/2019</span>
            </p>
        </li>
    `
    ).join("");
}