// creat a card DOM for each photographer
function setMediaCard(photographerName,mediaData) {
  const {title,video, image, likes, date}= mediaData;

  const typeMedia = ((video)=> video? 'video':'image')(video);
  const mediaSource = `assets/images/${photographerName.split(' ')[0]}/${(((image, video)=>image? image:video))(image, video)}`;

  class mediaFactory {
    constructor(title,source){
      this.title=title;
      this.source=source;
    }
    createCard(typeMedia){
      switch(typeMedia){
        case 'image':
          return imageCard(this.title, this.source);
        case 'video':
          return videoCard(this.title, this.source);
      }
    }
  }

  const imageCard = (title, source) =>{
    const mediaCard = document.createElement('img');
    mediaCard.setAttribute('src', source);
    mediaCard.setAttribute('alt',`${title}, closeup view`);
    return mediaCard;
  } 

  const videoCard = (title, source) =>{
    const mediaCard = document.createElement('video');
    mediaCard.setAttribute('controls','');
    mediaCard.setAttribute('aria-label',`${title}, closeup view`);
    const sourceMediaEle = document.createElement('source');
    sourceMediaEle.setAttribute('src',source);
    sourceMediaEle.setAttribute('type','video/mp4');
    mediaCard.appendChild(sourceMediaEle);
    return mediaCard;
  } 

  // set card DOM of each media of photographer
  function setMediaCardDOM(){
    const articleMedia = document.createElement('article');
    articleMedia.classList.add('_articleMedia');
    
    // link media
    const link = document.createElement('a');
      link.setAttribute('href','#');
      const media = new mediaFactory(title,mediaSource);
      const mediaCard = media.createCard(typeMedia);
      mediaCard.classList.add('_articleMedia-media');
    link.appendChild(mediaCard);

    // infos
    const infos = document.createElement('div');
      const photoTitle = document.createElement('h3');
        photoTitle.textContent = title;
      const countHeart = document.createElement('p');
        countHeart.textContent = likes;
      const iconHeart = document.createElement('i');
        iconHeart.setAttribute('aria-label','likes');
        iconHeart.classList.add('fa-solid', 'fa-heart');
    infos.classList.add('_articleMedia-infos');
    infos.appendChild(photoTitle);
    infos.appendChild(countHeart);
    infos.appendChild(iconHeart);
    // add to card
    articleMedia.appendChild(link);
    articleMedia.appendChild(infos);
      return (articleMedia);
  }

  return {likes, title, date, mediaSource,  setMediaCardDOM }
}