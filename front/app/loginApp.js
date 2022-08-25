const testUser = {
    name: "Beyoncé",
    login: "beyonce@gmail.com",
    password: "blue",
    city: "Houston, TX",
    category: "Cantora, compositora",
    avatar: "images/avatar.png"

}

function showForm() {
    let formulario = document.getElementById("formSignup");
    formulario.lastElementChild.remove();
    let name = document.getElementById('sName').value;
    let surName = document.getElementById('sSurName').value;
    let email = document.getElementById('sEmail').value;
    let date = document.getElementById('sDate').value;
    formulario.innerHTML +=
        `<label>Cidade</label>
    <input type="text" class="signup-input" id="sCity">
    <br>
    <label>Nome Artístico</label>  
   <input type="text" class="signup-input" id="sNick">
    <br>
    <label>Profissão</label>
    <input type="text" class="signup-input" id="sProfession">
    <br>
    <label>Fale sobre você</label>
    <br>
    <textarea class="signup-textarea" id="sBio"></textarea>
    <br>
    <label>Senha</label>
    <input type="password" class="signup-input" id="sPassword">
    <br>
    <label>Repita a senha</label>
    <input type="password" class="signup-input" id="sRepeatPassword">
    <div class="btnForm">
    <button type="submit" id="signup-button" onclick="signup()">Cadastrar</button>
    </div>`

    document.getElementById('sName').value = name;
    document.getElementById('sSurName').value = surName;
    document.getElementById('sEmail').value = email;
    document.getElementById('sDate').value = date;

}


function signup() {

    let arrayInputs = document.getElementsByClassName('signup-input');
    let follow = true;


    for (let i = 0; i < arrayInputs.length; i++) {
        if (arrayInputs[i].value == null || arrayInputs[i].value == "") {
            arrayInputs[i].setAttribute('class', 'signup-input empty');
            arrayInputs[i].setAttribute('placeholder', 'Preenchimento obrigatório');
            follow = false;
        } else {
            arrayInputs[i].setAttribute('class', 'signup-input notEmpty');
        }
    }



    if (follow) {
        senha = document.getElementById('sPassword');
        rSenha = document.getElementById('sRepeatPassword');
        if (senha.value !== rSenha.value) {
            follow = false;
            alert('Senhas não são compatíveis');
            senha.setAttribute('class', 'signup-input empty');
            rSenha.setAttribute('class', 'signup-input empty');
        }
        else {
            senha.setAttribute('class', 'signup-input notEmpty');
            rSenha.setAttribute('class', 'signup-input notEmpty');
            console.log('senha ok')
        }
    }

    if (follow) {

        //--------------BEGIN
        const data = accessData()
        console.log(data)
        const url = "http://localhost:3000/auth"


    fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
        .then((response) => {
            response.json();
            window.location = "profile.html"
            return alert("Cadastro realizado com sucesso!")
        })
        .catch((e) => {
            return console.error(e)
        })
        // -----------end
    

    }
}

function loginVerification() {

    const loginData = getLoginData();

    const url = "http://localhost:3000/auth"


    fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
        .then((response) => {
            response.json();
            window.location = "profile.html"
        })
        .catch((e) => {
            return console.error(e)
        })
}

function accessData() {
    return { 
        "name": document.getElementById('sName').value,
        "surName": document.getElementById('sSurName').value,
        "email": document.getElementById('sEmail').value,
        "birthDate": document.getElementById('sDate').value,
        "city": document.getElementById('sCity').value,
        "nickName": document.getElementById('sNick').value,
        "profession": document.getElementById('sProfession').value,
        "bio": document.getElementById('sBio').value,
        "password": document.getElementById('sPassword').value
    }
}

function getLoginData() {
    return {
        "email": document.getElementById('login').value,
        "password": document.getElementById('password').value
    }
}