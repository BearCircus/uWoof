async function getPets() {
  let query = encodeURIComponent(document.querySelector("#buscador").value);
  const res = await fetch("http://localhost:3000/api/pets/" + query, {
    method: "GET",
  });
  console.log(query);
  const data = await res.json();
  let crd = document.querySelector("#prods");

  crd.innerHTML = data
    .map(
      (m) => ` <div class="col-lg2 mb-4 ml-1">
                <div class="card mt-5 ml-1 mr-1" id="crd" title="pet">
                    <div class="line"> </div>
                    <div class="username mb-2" title="user">Offered by: <a href="/Profile/general.html?id=${m.userID}">${m.userID}</a></i>
                        <i class="fas fa-ellipsis-vertical" aria-hidden="true"></i>
                    </div>
                    <a href="/Post/PostJessica?id=${m.id}">
                    <br>
                    <img class="card-img-top cardImage" src="${m.image}" alt="Card image cap">
                    </a>
                      <h5 class="card-title">${m.name}</h5>
                    
                      <p class="card-text ml-1">"${m.description}</p>
                </div>        
            </div>`
    )
    .join("");
  return data;
}
var input = document.getElementById("buscador");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("boton").click;
  }
});

getPets();
