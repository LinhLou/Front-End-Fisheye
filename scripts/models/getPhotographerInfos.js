//  get data from the json document
// bien retourner le tableau photographers seulement une fois récupéré
async function getPhotographersInfos() {
  const response = await fetch('../../data/photographers.json'); 
  const photographers = await response.json();
  return photographers;
}

