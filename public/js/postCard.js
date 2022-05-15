async function getPost() {
  let resp = await fetch("/api/user/myinfo", {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
    },
  });
  let user = await resp.json();
  //console.log(user.id);

  let resPet = await fetch("/api/pets/?userID=" + user.id, {
    method: "GET",
  });
  let pet = await resPet.json();
  //console.log(pet)
  //console.log(user)

  document.querySelector("#postCard").innerHTML = pet
    .map(
      (m) =>
        `<tr>
      <td>
           <!--Aqui va una card-->
           <div class="card w-100">
           
                <div class="card-body">
                    <h5 class="card-title">${m.name}</h5>
                    <div class="post-animal-tags">
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.animal}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.gender}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.color}</a>
                        <a href="javascript:void();" class="badge badge-colour badge-pill">${m.temperment}</a>
                    </div>
                        <p class="card-text">${m.description}</p>
                    <a href="/Post/PostJessica?id=${m.id}" class="btn btn-style">Go to post</a>
                    <input type="button" value="Delete"id="delete" class="btn btn-danger" onclick="deletePost('${m.id}')"></input>
                </div>
            </div>
      </td>
    <tr>`
    )
    .join("");
  //return info;
}

function deletePost(id) {
  let res = fetch("/api/pets/" + id, {
    method: "DELETE",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
    },
  });
}

getPost();
