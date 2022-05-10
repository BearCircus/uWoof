async function registerUser(){
    console.log("firstName")
    let image = document.querySelector("#image").value;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let phone = document.querySelector("#phone").value;
    let email = document.querySelector("#email").value;
    let city = document.querySelector("#city").value;
    let zip = document.querySelector("#zip").value;
    let country = document.querySelector("#country").value;
    let state = document.querySelector("#state").value;
    
    let newUser = {
        firstName,
        lastName,
        username,
        password,
        phone,
        email,
        city,
        country,
        zip,
        state,
        image
    }
    
    const resp = await fetch('/api/register',{
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    const info = await resp.json();
    console.log(info)
    return info;
}

registerUser();

