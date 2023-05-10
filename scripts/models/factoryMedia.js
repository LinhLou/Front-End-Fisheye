
class mediaFactory {
  constructor(title,source){
    this.title=title;
    this.source=source;
  }

  createCard(typeMedia){
    switch(typeMedia){
      case 'image':
        return image(this.title, this.source);
      case 'video':
        return video(this.title, this.source);
    }
  }
}

const image = (title, source) =>{
  const mediaCard = document.createElement('img');
  mediaCard.setAttribute('src', source);
  mediaCard.setAttribute('alt',`${title}, closeup view`);
  return mediaCard;
} 

const video = (title, source) =>{
  const mediaCard = document.createElement('video');
  mediaCard.setAttribute('controls','');
  mediaCard.setAttribute('aria-label',`${title}, closeup view`);
  const sourceMediaEle = document.createElement('source');
  sourceMediaEle.setAttribute('src',source);
  sourceMediaEle.setAttribute('type','video/mp4');
  mediaCard.appendChild(sourceMediaEle);
  return mediaCard;
} 


