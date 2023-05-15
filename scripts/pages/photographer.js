// get id of photographer
const {href} = window.location; 
const idPhotographer = href.split('#')[1];

// function to display photographer page
async function displayIntro(photographer){
  // -----------Introduction section ----------------------------------------//
  const photographersSection = document.querySelector("._photographeIntro");
  const photographerCards = setPhotographerCard(photographer);
  const cardPhotographer = photographerCards.setPhotographerCardDOM();
  photographersSection.appendChild(cardPhotographer);
  // create a button
  const btn = document.createElement('button');
    btn.setAttribute('role','button');
    btn.classList.add('btn', 'btn-large');
    btn.textContent="Contactez-moi";
  cardPhotographer.removeChild(cardPhotographer.lastChild);// remove price
  // regroup name + location + slogan into a container
  const divInfo = document.createElement('div');
    divInfo.classList.add('_photographeIntro_infos');
    divInfo.appendChild(cardPhotographer.children[1]);
    divInfo.appendChild(cardPhotographer.children[1]);
    divInfo.appendChild(cardPhotographer.children[1]);
  // reorganisation article
  cardPhotographer.appendChild(divInfo);
  cardPhotographer.appendChild(btn);
  cardPhotographer.appendChild(cardPhotographer.firstChild);// move the photo to the end
  // add new class to article
  cardPhotographer.classList.add('article_photographer');  
}

async function displayEncart(photographer,medias){

  // -------------encart----------------------------------//
    const main = document.getElementById('_main');
    const divEncart = document.createElement('div');
      divEncart.innerHTML =`<div>${medias[0].likes} <i class="fa-solid fa-heart"></i>${photographer.price}€ / jour </div>`;
      divEncart.classList.add('encart');
    main.appendChild(divEncart);
  }

async function displayMedias(photographer,medias){
  // -----------Meadia section --------------------------------------------//
  const mediasSection = document.querySelector("._photographeMedias");
  mediasSection.innerHTML='';
  medias.forEach((mediaData)=>{
    const media = setMediaCard(photographer.name,mediaData);
    const mediaCard = media.setMediaCardDOM();
    mediasSection.appendChild(mediaCard);
  })
}

async function initIntro(){
  const {photographer, medias} = await getPhotographerDataById(idPhotographer);
  displayIntro(photographer[0]);
  displayEncart(photographer[0],medias);
}

async function initMedia(){
  const {photographer, medias} = await getPhotographerDataById(idPhotographer);

  const btnSelect = document.querySelector('._select-btn');
  const typeToSort = ((ele)=>ele.textContent=='Popularité'? 'likes': ele.textContent=='Date' ? 'date': 'title')(btnSelect);
  const mediasSort = new SortData(medias);
  const mediasSortByType = mediasSort.sortType(typeToSort);

  displayMedias(photographer[0],mediasSortByType);
}

initIntro();
initMedia();
