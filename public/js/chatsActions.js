async function getChats(query){
    sessionStorage.setItem("token", "nfjsdngdsog");

    const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
            "x-auth": sessionStorage.getItem("token")
        }
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
                <img src=${} alt="Retail Admin">
            </div>
            <p class="name-time">
                <span class="name"></span>
                <span class="time">15/02/2019</span>
            </p>
        </li>
    `
    ).join("");
}

async function sendNewMessage(){
    
}