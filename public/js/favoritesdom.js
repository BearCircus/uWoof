async function getFavorites() {

    //console.log('test');
    
    const response = await fetch('/api/favorites', {
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.getItem('token')
            
        }
    });

    const data = await response.json();
    //console.log(data);

    return data;
}

async function showFavorites(){

    //console.log("show data");
    //event.preventDefault();

    let data = await getFavorites();
    //console.log(data);

    let fav = document.querySelector("tbody#favCard"); 

    fav.innerHTML = data.favorites.map(favorite => !favorite.publication? '':`
        <tr>
            <td>
                <div class="media w-100">
                    <div class="card-body">
                        <h5 class="card-title">${favorite.publication.name}</h5>
                        <div class="media-center h-10 w-10">
                            <img id="imgfav"class="card ml-3 mt-3 center " style="" src="${favorite.publication.image}">
                        </div>
                        <p class="card-text">${favorite.comment}</p>
                        <a href="/Post/PostJessica/?id=${favorite.publication.id}" class="btn btn-style">Go to pet</a>
                        <a href="#" class="btn btn-danger" onclick="deleteFavorite('${favorite._id}')">Delete</a>
                    </div>
                    
                </div>
            </td>
        </tr>
        `).join("")
}

function filterFav() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

async function deleteFavorite(favID){
    event.preventDefault();
    //console.log(favID);

    const response = await fetch('/api/favorites/' + favID, {

        method: 'DELETE',
        headers: {
            'x-auth': sessionStorage.getItem('token')
        }

    });

    //console.log("deleted");

    showFavorites();

}



async function addFavorite(){

    //console.log("addFave success");

    let comment = {
        'comment': String(document.getElementById("comFav").value)
    }
    //console.log("comment");
    //console.log(comment);

    const resp = await fetch('/api/favorites/' + sessionStorage.getItem("pubID"), {
        method: 'POST',
        headers: {
            'x-auth': sessionStorage.getItem('token'),
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(comment)
    });

    let data = await resp.json();
    //console.log("post data");
    //console.log(data);
}
