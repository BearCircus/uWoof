async function getInfoUserPublication(){
    let id = 
    const resp = await fetch('/api/register/owner'+id){
        method: 'GET'
    };
    const info = await resp.json();
    return info;
}

