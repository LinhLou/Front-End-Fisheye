class Video {
  constructor(data){
    const {photographer, media} = data;
    this.id = media.id;
    this.title = media.title;
    this.video = media.video;
    this.name = photographer.name;
    this.source=`assets/images/${this.name.split(' ')[0]}/${this.video}`;
  }

  createVideoCard = () =>{
    const mediaCard = document.createElement('video');
    mediaCard.setAttribute('id',this.id);
    mediaCard.setAttribute('controls','');
    mediaCard.setAttribute('aria-label',`${this.title}, closeup view`);
    const sourceMediaEle = document.createElement('source');
    sourceMediaEle.setAttribute('src',this.source);
    sourceMediaEle.setAttribute('type','video/mp4');
    mediaCard.appendChild(sourceMediaEle);
    mediaCard.classList.add('_articleMedia-media');
    return mediaCard;
  }
}

class Image {
  constructor(data){
    const {photographer, media} = data;
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.name = photographer.name;
    this.source=`assets/images/${this.name.split(' ')[0]}/${this.image}`;
  }

  createImageCard = () =>{
    const mediaCard = document.createElement('img');
    mediaCard.setAttribute('id', this.id);
    mediaCard.setAttribute('src', this.source);
    mediaCard.setAttribute('alt',`${this.title}, closeup view`);
    mediaCard.classList.add('_articleMedia-media');
    return mediaCard;
  }
}

class MediaFactory {
  
  type = (image,video)=>image? 'image': video? 'video':'type inexist';

  createMediaCard(data){
    const {media} = data;
    const {video, image} = media;
    const typeMedia = this.type(image,video);
    switch(typeMedia){
      case 'image':
        const imageObj =  new Image(data);
        return imageObj.createImageCard();
      case 'video':
        const videoObj = new Video(data);
        return videoObj.createVideoCard();
      default:
      break;
    }
  }

  
}




