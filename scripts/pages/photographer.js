//code JavaScript lié à la page photographer.html

async function photographerData(id){
  const { photographers, media} = await getPhotographersInfos();
  const photographer = photographers.filter((photographe)=>photographe.id==id);
  const medias = media.filter((media)=>media.photographerId==id);
  return {photographer, medias};
}

// display photographer Introduction

// async function displayIntro(data){
//   const {name,  city, country, tagline, portrait} = data;
//   const photo = `assets/photographers/${portrait}`;
//   const nameEle = document.querySelector('._infos_name');
//     nameEle.innerHTML=name;
//   const locationEle = document.querySelector('._infos_location');
//     locationEle.innerHTML=`${city}, ${country}`;
//   const sloganEle = document.querySelector('._infos_slogan');
//     sloganEle.innerHTML = tagline;
//   const photoEle = document.querySelector('._photo');
//     photoEle.setAttribute('src',photo);
//     photoEle.setAttribute('alt',name);
// }

async function displayIntro(photographer) {
  const photographersSection = document.querySelector("._photographeIntro");
  const photographerIntro = setPhotographerCard(photographer);
  const card = photographerIntro.setPhotographerCardDOM();
  photographersSection.appendChild(card);
  // add button
  const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-large');
    btn.textContent="Contactez-moi";
  card.removeChild(card.lastChild);// remove price
  const divInfo = document.createElement('div');
    divInfo.classList.add('_photographeIntro_infos');
    divInfo.appendChild(card.children[1]);
    divInfo.appendChild(card.children[1]);
    divInfo.appendChild(card.children[1]);
  card.appendChild(divInfo);
  card.appendChild(btn);
  card.appendChild(card.firstChild);
  card.classList.add('article_photographer');
    
};

async function initPhotographe(){
  // get id of photographer
  const {href} = window.location; 
  const idPhotographer = href.split('#')[1]; 
  //get data
  const {photographer} = await photographerData(idPhotographer);
  displayIntro(photographer[0]);
}
initPhotographe();
