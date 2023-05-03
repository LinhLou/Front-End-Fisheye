//code JavaScript lié à la page photographer.html

async function photographerData(id){
  const { photographers, media} = await getPhotographersInfos();
  const photographer = photographers.filter((photographe)=>photographe.id==id);
  const medias = media.filter((media)=>media.photographerId==id);
  return {photographer, medias};
}

// display photographer Introduction

async function displayIntro(data){
  const {name,  city, country, tagline, portrait} = data;
  const photo = `assets/photographers/${portrait}`;
  const nameEle = document.querySelector('._infos_name');
    nameEle.innerHTML=name;
  const locationEle = document.querySelector('._infos_location');
    locationEle.innerHTML=`${city}, ${country}`;
  const sloganEle = document.querySelector('._infos_slogan');
    sloganEle.innerHTML = tagline;
  const photoEle = document.querySelector('._photo');
    photoEle.setAttribute('src',photo);
    photoEle.setAttribute('alt',name);
}
async function initPhotographe(){
  // get id of photographer
  const {href} = window.location; 
  const idPhotographer = href.split('#')[1]; 
  //get data
  const {photographer} = await photographerData(idPhotographer);
  displayIntro(photographer[0]);
}
initPhotographe();
