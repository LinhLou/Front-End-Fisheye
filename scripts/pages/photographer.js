//Mettre le code JavaScript lié à la page photographer.html

// get id of photographer
const {href} = window.location; // get current URL
const idPhotographe = href.split('#')[1]; // get id

async function photographerData(id){
  const { photographers, media} = await getPhotographersInfos();
  const photographe = photographers.filter((photographe)=>photographe.id==id);
  const medias = media.filter((media)=>media.photographerId==id);
  return {photographe, medias};
}
