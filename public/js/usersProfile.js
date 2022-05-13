async function getInfoUserPublication(){
    
    const resp = await fetch('/api/register/myinfo',{
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.getItem("token")
        }
    });
    const info = await resp.json();
    
    //console.log(infoArray)
    return info;
}


async function showProfileInfo(){
    const info = await getInfoUserPublication()
    //console.log(info)
    let url = "https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"

    let divProfile = document.querySelector("#profile1")
    let divProfile2 = document.querySelector("#prof")

    if(info.image){
        url = info.image
    }    
    divProfile.innerHTML = `
    <div class="user-box">
        <img src="${url}" alt="user avatar">
    </div>
    <h5 class="mb-1 text-white">${info.username}</h5> <!--Nombre usuario-->
    `

    divProfile2.innerHTML = `
    <ul class="list-group shadow-none">
        <li class="list-group-item">
            <div class="list-details">
                <small>Mobile Number: </small>
                <span>${info.phone}</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="list-details">
                <small>Email Address: </small>
                <span>${info.email}</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="list-details">
                <small>Ubication: </small>
                <span>${info.city}, ${info.state}, ${info.country}</span>
            </div>
        </li>
    </ul>
    `
}

showProfileInfo()


async function updateUser(){
    console.log("Update")
    event.preventDefault()

    let name = document.querySelector("#name").value
    let lastname = document.querySelector("#lastname").value
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let phone = document.querySelector("#phone").value
    let email = document.querySelector("#email").value
    let city = document.querySelector("#city").value
    let country = document.querySelector("#country").value
    let zip = document.querySelector("#zip").value
    let state = document.querySelector("#state").value
    let image = document.querySelector("#image").value
    
    let updatedUser = {
        name,
        lastname,
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
    
    //console.log(updatedUser)
    const resp = await fetch('/api/register',{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'x-auth': sessionStorage.getItem("token")
        },
        body: JSON.stringify(updatedUser)
    });
    
    const info = await resp.json()
    console.log(info)
    return info;
}

//updateUser()