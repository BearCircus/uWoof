async function getPost() {
  let resp = await fetch("/api/register/myinfo", {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
    },
  });
  let user = await resp.json();
  console.log(user);
  let resPet = await fetch("/api/pets/?userID=" + user.id, {
    method: "GET",
  });
  let pets = await resPet.json();
  let pet = [];
  pet.push(pets);
  console.log(pet);
  document.querySelector("#postCard").innerHTML = pet.map((m) => {
    `<td>
           <!--Aqui va una card-->
           <div class="card w-100">
                <div class="card-body">
                    <h5 class="card-title">${m.pet.name}</h5>
                    <div class="post-animal-tags">
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.pet.animal}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.pet.gender}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.pet.color}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.pet.temperment}</a>
                        </div>
                        <p class="card-text">${m.pet.description}</p>
                    <a href="http://localhost:3000/Post/PostJessica?id=ctXv5sWj9b2RjjlwGxDSR/Post/PostJessica?id=${m.pet.id}" class="btn btn-style">Go to post</a>
                </div>
            </div>
        </td>`;
  });
  return info;
}
getPost();
