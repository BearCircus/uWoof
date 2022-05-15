async function register() {
  let postImage = document.querySelector("#image").value;
  //console.log(postImage);
  let postName = document.querySelector("#name").value;
  let postAnimal = document.querySelector("#animal").value;
  let postAge = document.querySelector("#age").value;
  let postTemp = document.querySelector("#temperment").value;
  let postColor = document.querySelector("#color").value;
  let postSize = document.querySelector("#size").value;
  let postBreed = document.querySelector("#breed").value;
  let postGender = document.querySelector("#gender").value;
  let postHealth = document.querySelector("#health").value;
  let postCastrated = document.querySelector("#castrated").value;
  let postVacc = document.querySelector("#vaccinated").value;
  let postDesc = document.querySelector("#postDesc").value;
  // let streetPost = document.querySelector("#street").value;
  // let streetNumbPost = document.querySelector("#streetNumb").value;
  // let cityPost = document.querySelector("#city").value;
  // let countryPost = document.querySelector("#country").value;

  // console.log(postImage);
  // console.log(postAnimal);
  // console.log("postAge", postAge);
  // console.log("postTemp", postTemp);
  // console.log("color", postColor);
  // console.log("size", postSize);
  // console.log("breed", postBreed);
  // console.log("gend", postGender);
  // console.log("hp", postHealth);
  // console.log("cast", postCastrated);
  // console.log("vacc", postVacc);
  // console.log("desc", postDesc);
  // console.log("street", streetPost);
  // console.log("street", streetNumbPost);
  // console.log("city", cityPost);
  // console.log("country", countryPost);

  let neut = true;
  if (Number(postCastrated) == 0) {
    health = false;
  }
  let vacc = true;
  if (Number(postVacc) == 0) {
    vacc = false;
  }
  let user = await fetch("/api/user/myinfo", {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
    },
  });
  let userid = await user.json();
  let res = await fetch("/api/pets/" + userid.id, {
    method: "POST",
    headers: {
      "x-auth": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: postName,
      animal: postAnimal,
      age: Number(postAge),
      temperment: postTemp,
      color: postColor,
      size: postSize,
      breed: postBreed,
      gender: postGender,
      health: postHealth,
      castrated: neut,
      vaccinated: vacc,
      image: postImage,
      description: postDesc,
    }),
  });
}
