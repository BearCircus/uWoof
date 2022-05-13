async function getInfoUserPublication(id){
    const resp = await fetch('/api/register/ownerprof/'+id,{
        method: 'GET',
    });
    const info = await resp.json();
    let infoArray = []
    imfoArray.push(info)
    console.log(info)
    return infoArray;
}
 
async function showProfileInfo(){
    const info = await getInfoUserPublication("iMmvaiObkPUXBVuUMIgPP")

    let divProfile = document.querySelector("#profile")
    let divProfile2 = document.querySelector("#profile2")

    divProfile.innerHTML = info.map(prof =>`
    <div class="user-box">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar">
    </div>
    <h5 class="mb-1 text-white">${prof.username}</h5> <!--Nombre usuario-->
    `).join("");

    divProfile2.innerHTML = info.map(prof=>`
    <ul class="list-group shadow-none">
        <li class="list-group-item">
            <div class="list-details">
                <small>Mobile Number: </small>
                <span>${prof.phone}</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="list-details">
                <small>Email Address: </small>
                <span>${prof.email}</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="list-details">
                <small>Ubication: </small>
                <span>${prof.city}, ${prof.state}, ${prof.country}</span>
            </div>
        </li>
    </ul>
    `).join("");
}

showProfileInfo()