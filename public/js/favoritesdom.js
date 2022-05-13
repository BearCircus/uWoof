
async function getFavorites() {
    event.preventDefault(); //cuando son links y forms

    console.log('test');
    
    const response = await fetch('/api/favorites', {
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.getItem('token')
            
        }
    });

    const data = await response.json();
    console.log(data);

    return data;
}

