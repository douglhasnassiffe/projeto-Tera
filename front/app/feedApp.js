const testUser = {
    name: "Beyoncé",
    login: "beyonce@gmail.com",
    password: "blue",
    city: "Houston, TX",
    category: "Cantora, compositora",
    avatar: "images/avatar.png"

}


function addPost() {
    
    let postText = document.getElementById('post-text');

    if (postText.value != ""){
    let post = document.createElement('section')
    let postDate = new Date();
    post.setAttribute('class', 'profile-section')
    post.innerHTML = `<div class="feed-publicacao-profile">
    <img src="${testUser.avatar}" alt="Foto de ${testUser.name}" class="foto-perfil-feed">
    <div>
        <h4>${testUser.name}</h4>
        <ul>
            <li>${testUser.category}</li>
            <li>${testUser.city}</li>
            <li>${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}</li>
        </ul>
        </div>
        <div class="delete-button">
            <img src="images/lixeira-icone.png" alt="apagar post">
         </div>
        </div>
    </div>
<hr>
<div>
    <p>${postText.value}</p>
</div>
<div class="feed-interacao-publicacao">
</div>
<hr>
<div class="feed-interacao">
    <a href="">
        <img src="images/Curtir.png" alt="Curtir">
        Curtir</a>
    <a href="">
        <img src="images/Comentar.png" alt="Comentar">
        Comentar</a>
    <a href="">
        <img src="images/Compartilhar.png" alt="Compartilhar">
        Compartilhar</a>
    <a href="">
        <img src="images/Megafone.png" alt="Denunciar">
        Denunciar</a>
</div>
<div class="feed-publicacao">
    <img src="images/avatar.png" alt="Foto de Perfil" class="foto-perfil-feed">
    <input type="text" placeholder="Adicionar Comentário" class="input-feed">
    <input type="button" value="Postar" class="post-button">
</div>`
    postText.value = "";
    let mainFeed = document.getElementById('feed-section')
    mainFeed.prepend(post);
    }
}