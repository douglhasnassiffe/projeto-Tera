function addEvents(){

    let category =document.getElementById("categoryList")
    
    for (let i=0;i<category.children.length;i++)
        category.children[i].addEventListener('click',multipleChecks);

    let time = document.getElementById('timeList');

    for (let i=0;i<time.children.length;i++)
        time.children[i].addEventListener('click',onlyCheck);
    
}

addEvents()

function multipleChecks(){
    if (this.classList.contains('checked'))
        this.setAttribute('class', 'unchecked');
    else
        this.setAttribute('class', 'checked');
}

function onlyCheck(){
    let timeList = document.getElementById('timeList');
    for (let i=0;i<timeList.children.length;i++)
        timeList.children[i].setAttribute('class','unchecked');

    this.setAttribute('class','checked');
}

function explore(){
    let searchString = document.getElementById('search-input');

    if (searchString.value !=""){

    let category = document.querySelectorAll('#categoryList .checked');
    let time = document.querySelector('#timeList .checked');

    let categoryList =[];
   for (let i=0;i<category.length;i++)
        categoryList.push(category[i].innerText);
    
    let results = document.querySelector('.results')
        if (results == null){
            results = document.createElement('section');
            results.setAttribute('class', 'explore-section results');
        }else
            results.innerHTML="";

    results.innerHTML= `<h1>Resultados para: ${searchString.value}</h1>
    <div class="details-search"><h4>Em: ${categoryList.join(' - ')}</h4>
    <h4>Período: ${time.innerText}</h4></div>
    <div class="result-topics">Resultados...</div>`;
    searchString.value="";
    let mainFeed = document.getElementById('search-content');
    mainFeed.appendChild(results);
}
}

