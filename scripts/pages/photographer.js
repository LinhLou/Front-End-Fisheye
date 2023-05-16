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
    btn.setAttribute('id','button-Contact');
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

async function displayMedias(data){
  // -----------Meadia section --------------------------------------------//
  const {photographerInfos, mediasSorted}=data;
  const mediasSection = document.querySelector("._photographeMedias");
  mediasSection.innerHTML='';
  const photographer =photographerInfos[0];
  mediasSorted.forEach((media)=>{
    const mediaObj = new MediaFactory();
    const mediaCard = mediaObj.createMediaCard({photographer,media});
    mediasSection.appendChild(mediaCard);
  })
}

async function initIntro(){
  const {photographerInfos, medias} = await getPhotographerDataById(idPhotographer);
  displayIntro(photographerInfos[0]);
  displayEncart(photographerInfos[0],medias);
}

async function initMedia(){
  const {photographerInfos, medias} = await getPhotographerDataById(idPhotographer);

  const btnSelect = document.querySelector('._select-btn');
  const typeToSort = ((ele)=>ele.textContent=='Popularité'? 'likes': ele.textContent=='Date' ? 'date': 'title')(btnSelect);
  const mediasSortObj = new SortData(medias);
  const mediasSorted = mediasSortObj.sortType(typeToSort);
  displayMedias({photographerInfos,mediasSorted});
}

initIntro();
initMedia();
