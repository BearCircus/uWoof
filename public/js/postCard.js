

async function getPost(){
    const resp = await fetch('/api/register/myinfo',{
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.getItem("token")
        }
    });
    const info = await resp.json();
    //console.log(infoArray)
    return info;
}