const axios = require("axios");
mainPage
axios({
  method: "get",
  url: "http://localhost:3000/api/pets",
}).then((res)=>{
    const data=res.data;
    console.log(data);
})
async function getProducts(){
  const res = await fetch("http://localhost:3000");
}
