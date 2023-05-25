// Model
async function getDataById(id){
  const { photographers, media} = await getData();
  const photographerInfos = photographers.filter((photographe)=>photographe.id==id);
  const medias = media.filter((media)=>media.photographerId==id);
  return {photographerInfos, medias};
}

async function getPhotographerData(){
  const {href} = window.location; 
  const idPhotographer = href.split('#')[1];
  const {photographerInfos, medias} = await getDataById(idPhotographer);
  return {photographerInfos, medias};
}

async function dataProcess(){
  const {photographerInfos, medias} = await getPhotographerData();

  const btnSelect = document.querySelector('._select-btn');
  const typeToSort = ((ele)=>ele.textContent=='Popularité'? 'likes': ele.textContent=='Date' ? 'date': 'title')(btnSelect);
  const mediasSortObj = new SortData(medias);
  const mediasSorted = mediasSortObj.sortType(typeToSort);
  return {photographerInfos,mediasSorted};
}

// View
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
  const totalLikes = medias.reduce((acc,ele)=>acc+ele.likes,0);
    divEncart.innerHTML =`<div><span class='totalLikes'>${totalLikes}</span> <i class="fa-solid fa-heart"></i>${photographer.price}€ / jour </div>`;
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
    const articleMedia = document.createElement('article');
    articleMedia.classList.add('_articleMedia');
    // link contains photo or video
    const linkMedia = document.createElement('a');
    linkMedia.setAttribute('href',`#${media.photographerId}`);
    linkMedia.classList.add('_articleMedia-link');
    const mediaObj = new MediaFactory();
    const mediaCard = mediaObj.createMediaCard({photographer,media});
    linkMedia.appendChild(mediaCard);
    // infos
    const infosCard = document.createElement('div');
    const mediaTitle = document.createElement('h3');
    mediaTitle.textContent = media.title;
    const countHeart = document.createElement('p');
      countHeart.textContent = media.likes;
    const iconHeart = document.createElement('i');
      iconHeart.setAttribute('id',media.id);
      iconHeart.setAttribute('tabindex','0');
      iconHeart.setAttribute('aria-label','likes');
      iconHeart.classList.add('fa-solid', 'fa-heart');
    infosCard.classList.add('_articleMedia-infos');
    infosCard.appendChild(mediaTitle);
    infosCard.appendChild(countHeart);
    infosCard.appendChild(iconHeart);
    // display
    articleMedia.appendChild(linkMedia);
    articleMedia.appendChild(infosCard);
    mediasSection.appendChild(articleMedia);
  })
}

async function displayModalContact(photographer){
  const headerEle = document.querySelector('#modal-heading');
  headerEle.innerHTML = `Contactez-moi <br> ${photographer.name}`;
}

async function modalContactControl(){
  // modal contact:
  const modalContact = document.getElementById('contact_modal');
  const modalGestion = new ModalGestion(modalContact);
}

// control
function lightboxControl(){
  const lightboxEle = document.querySelector('.lightbox-container');
  const lightbox = new LightboxGestion(lightboxEle);
}

function likesControl(){
  const mediaSection = document.querySelector('._photographeMedias');
  const likesGestionObj = new LikesGestion(mediaSection);
}

function selectGestion(){
  const selectSection = document.querySelector('._select');
  const selectObj = new MenuSelectNavigation(selectSection);
}


async function initPhotographerPage(){
  const {photographerInfos, medias} = await getPhotographerData();
  displayIntro(photographerInfos[0]);
  displayModalContact(photographerInfos[0]);
  displayEncart(photographerInfos[0],medias);
  lightboxControl();
  likesControl();
  modalContactControl();
  selectGestion();
}

async function initMedia(){
  const {photographerInfos, mediasSorted} = await dataProcess();
  displayMedias({photographerInfos,mediasSorted});
}

initPhotographerPage();
initMedia();
