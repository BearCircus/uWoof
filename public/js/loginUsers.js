async function userLogin(){
    event.preventDefault()
    let email = document.querySelector("#emailLogin").value;
    let password = document.querySelector("#passwordLogin").value;

    let loggedIn = {
        email, password
    }
   // console.log(loggedIn)
    const resp = await fetch('/api/login',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loggedIn)
    });
    //console.log(resp);
    const info = await resp.json();
    //console.log(info)
    sessionStorage.setItem("token",info.token);
    return info;
}

//userLogin()