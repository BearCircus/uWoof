async function getPost() {
  let value = params.id;
  let response = await fetch("/api/pets/" + value.toString(), {
    method: "GET",
  });
  const pet = await response.json();
  // console.log(pet);

  // console.log(petPicture);
  // console.log(pet.image);
  // console.log(typeof pet.image);
  let neut = "Not Neutered";
  if (pet.castrated) {
    neut = "Neutered";
  }
  let vacc = "Not Vaccinated";
  if (pet.vaccinated) {
    vacc = "Vaccinated";
  }
  // console.log(pet.vaccinated);
  // console.log(vacc);
  // if (pet.age<) {

  // }
  // atributos de la mascota
  document.querySelector(
    "#petPicture"
  ).innerHTML = `<img style="justify-content: center" class="card-img-top" src="${pet.image}" alt="..." />`;
  document.querySelector(
    "#petName"
  ).outerHTML = `<h1 style="margin-bottom: 20px;" class="display-5 fw-bolder" id="petName">${pet.name}</h1>`;
  document.querySelector("#petTags").innerHTML = `
                            <span id="tags">${pet.color}</span>
                            <span id="tags">${pet.temperment}</span>
                            <span id="tags">${pet.size}</span>
                            <span id="tags">${neut}</span>
                            <span id="tags">${vacc}</span>`;
  document.querySelector(
    "#petDesc"
  ).innerHTML = `<pclass="lead">${pet.description}</pclass=>`;
  document.querySelector("#petOthers").innerHTML = `
                                        <p style="padding: 5px; border-radius: 6px; color: white; background-color: rgba(15, 31, 77, 0.795)">Animal: <span>${pet.animal}</span></p>
                                        <p style="padding: 5px; border-radius: 6px; color: white; background-color: rgba(15, 31, 77, 0.795)">Age: <span>${pet.age} years old</span></p>
                                        <p style="padding: 5px; border-radius: 6px; color: white; background-color: rgba(15, 31, 77, 0.795)">Gender: <span>${pet.gender}</span></p>
                                        <p style="padding: 5px; border-radius: 6px; color: white; background-color: rgba(15, 31, 77, 0.795)">Breed: <span>${pet.breed}</span></p>`;

  //obtenemos el usuario
  console.log(pet.userID);
  let res = await fetch(
    "http://localhost:3000/api/user/owner/" + pet.userID.toString(),
    {
      method: "GET",
    }
  );
  const user = await res.json();
  let url =
    "https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
  if (user.image) {
    url = user.image;
  }

  document.querySelector(
    "#profImage"
  ).innerHTML = `<div class="profile"> <img style="max-height: 200px" src="${url}" class="rounded-circle" width="80"> </div>`;
  document.querySelector("#profData").innerHTML = `
                        <h4>${user.username}</h4>
                         <span class="follow text-muted d-block mb-2">${user.city}</span>
                        <button class="mb-2 btn btn-dark btn-sm" onclick="processToChat()" href="/chat">Begin Chat</button>`;

  //to do map
  // document.querySelector("#userMap").innerHTML=`<iframe class="map" src="https://www.google.com/maps/place/${user.city},+${user.state}/" width="800" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`

  return pet;
}
async function processToChat(post_id) {
  let ownerId = post_id.userID;
  console.log(ownerId);

  let receptor_id = await getUsersToFind(ownerId);
  console.log(receptor_id);

  await fetch("/api/chat/" + post_id + "/" + receptor_id, {
    method: "POST",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
}
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
getPost();
