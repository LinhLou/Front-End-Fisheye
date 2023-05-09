//  get data from the json document
// bien retourner le tableau photographers seulement une fois récupéré
async function getPhotographersInfos() {
  const response = await fetch('../../data/photographers.json'); 
  const photographers = await response.json();
  return photographers;
}


async function getPhotographerDataById(id){
  const { photographers, media} = await getPhotographersInfos();
  const photographer = photographers.filter((photographe)=>photographe.id==id);
  const medias = media.filter((media)=>media.photographerId==id);
  return {photographer, medias};
}

