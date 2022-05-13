async function getPets() {
  let query = encodeURIComponent(document.querySelector("#buscador").value);
  const res = await fetch("http://localhost:3000/api/pets/" + query, {
    method: "GET",
  });
  console.log(query);
  const data = await res.json();
  let crd = document.querySelector("#crd");

  crd.innerHTML = data
    .map(
      (m) => ` <div class="col-lg2 mb-4 ml-1">
                <div class="card mt-5 ml-1 mr-1" title="pet">
                <div class="btnsmpets btn btn-sm btn-dark position-absolute" style=" top: 0.5rem; right: 0.5rem"><i class="fa fa-heart" aria-hidden="true"></i></div>
                    <div class="line"> </div>
                    <div class="username mb-2" title="user1">Offered by: <a href="/Profile/general.html?id=${m.userID}">${m.userID}</a></i>
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

// async function procesarInformacion(page = 1) {
//   let query = encodeURIComponent(document.querySelector("#buscador").value);
//   // console.log(query);
//   const response = await fetch(
//     "https://products-dasw.herokuapp.com/api/products?title=" + query,
//     {
//       method: "GET",
//       headers: {
//         "x-expediente": "726487",
//       },
//     }
//   );
//   //como getProducts es asíncrona debemos usar await para esperar a que se ejecute
//   //por lo que esta función también debe ser asíncrona
//   const data = await response.json();
//   // console.log(typeof data);
//   let crd = document.querySelector("#cards");

//   let toShow = data.slice((page - 1) * 4, page * 4);
//   crd.innerHTML = toShow
//     .map(
//       (m) => `<div class="col-lg2 mb-4">
//                 <div class="card mt-5 ml-3 mr-2" id="crd" title="La fruta no es lo único fresco">
//                     <img class="card-img-top cardImage" src="${m.imageUrl}" alt="Card image cap">
//                     <div class="card-body">
//                       <h5 class="card-title">${m.title}</h5>
//                       <p class="card-text">${m.description}</p>
//                     </div>
//                     <div class="mb-3">
//                         <p class="card-text" style="text-align: center;">${m.unit} x ${m.pricePerUnit}</p>
//                     </div>
//                 <div class="addToCart mb-2" style="text-align: center;">
//                 <button class="btn btn-primary" onclick="setProductId('${m.uuid}')" data-toggle="modal" data-target="#modalCart" style="margin: auto">Add to cart</button></div>

//                 </div>
//             </div>`
//     )
//     .join("");

//   // console.log(data);
//   return data;
// }
