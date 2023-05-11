
// display photographer page

async function displayPhotographer(photographer, medias) {
// -----------Introduction section ----------------------------------------//
  const photographersSection = document.querySelector("._photographeIntro");
  const photographerCards = setPhotographerCard(photographer);
  const cardPhotographer = photographerCards.setPhotographerCardDOM();
  photographersSection.appendChild(cardPhotographer);
  // create a button
  const btn = document.createElement('button');
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
// -----------Meadia section --------------------------------------------//
  const mediasSection = document.querySelector("._photographeMedias");
  medias.forEach((mediaData)=>{
    const media = setMediaCard(photographer.name,mediaData);
    const mediaCard = media.setMediaCardDOM();
    mediasSection.appendChild(mediaCard);
  })

// -------------encart----------------------------------//
  const main = document.getElementById('_main');
  const divEncart = document.createElement('div');
    divEncart.innerHTML =`<div>${medias[0].likes} <i class="fa-solid fa-heart"></i>${photographer.price}€ / jour </div>`;
    divEncart.classList.add('encart');
  main.appendChild(divEncart);
};

async function initPhotographe(){
  // get id of photographer
  const {href} = window.location; 
  const idPhotographer = href.split('#')[1]; 
  const {photographer, medias} = await getPhotographerDataById(idPhotographer);
  displayPhotographer(photographer[0], medias);
}
initPhotographe();
