async function registerUser() {
  event.preventDefault();
  let image = document.querySelector("#image").value;
  let name = document.querySelector("#firstName").value;
  let lastname = document.querySelector("#lastName").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let phone = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let city = document.querySelector("#city").value;
  let zip = document.querySelector("#zip").value;
  let country = document.querySelector("#country").value;
  let state = document.querySelector("#state").value;

  //console.log( firstName,lastName,username,password,phone,email,city,country,zip,state,image)

  let newUser = {
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
    image,
  };
  //console.log(newUser);
  const resp = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const info = await resp.json();
  //console.log(info)
  return info;
}

//registerUser();
