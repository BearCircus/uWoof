
async function getGeneralInfoUser(){
    const resp = await fetch('/api/user/ownerprof/'+params.id,{
        method: 'GET'
    });

  const info = await resp.json();
  //return info;

  console.log(info);

  let url =
    "https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

  let divProfile = document.querySelector("#prof1");
  let divProfile2 = document.querySelector("#prof2");

  if (info.image) {
    url = info.image;
  }

  divProfile.innerHTML = `
    <div class="user-box">
        <img src="${url}" alt="user avatar">
    </div>
    <h5 class="mb-1 text-white">${info.username}</h5> <!--Nombre usuario-->
    `;
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
    `;
}

getGeneralInfoUser();
