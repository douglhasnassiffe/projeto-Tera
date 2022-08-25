console.log("Estou funcionando!");

const url = "https://reqres.in/api/users?page=2";

const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

fetch(url, options)
.then(response => {
    response.json()
    .then(dados => {
        console.log(dados);
        const usuarios = dados.data;
        console.log(usuarios);
    })
})
.catch()