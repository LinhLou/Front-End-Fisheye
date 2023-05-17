const setMediaInfosCardDom = (title,likes)=>{
  // infos
  const infosCard = document.createElement('div');
  const photoTitle = document.createElement('h3');
    photoTitle.textContent = title;
  const countHeart = document.createElement('p');
    countHeart.textContent = likes;
  const iconHeart = document.createElement('i');
    iconHeart.setAttribute('aria-label','likes');
    iconHeart.classList.add('fa-solid', 'fa-heart');
  infosCard.classList.add('_articleMedia-infos');
  infosCard.appendChild(photoTitle);
  infosCard.appendChild(countHeart);
  infosCard.appendChild(iconHeart);
  return infosCard;
}

class Video {
  constructor(data){
    const {photographer, media} = data;
    this.likes = media.likes;
    this.title = media.title;
    this.video = media.video;
    this.name = photographer.name;
    this.source=`assets/images/${this.name.split(' ')[0]}/${this.video}`;
  }

  createVideoCard = () =>{
    const articleMedia = document.createElement('article');
    articleMedia.classList.add('_articleMedia');
    // link contains video
    const link = document.createElement('a');
    link.setAttribute('href','#');
    const mediaCard = document.createElement('video');
    mediaCard.setAttribute('controls','');
    mediaCard.setAttribute('aria-label',`${this.title}, closeup view`);
    const sourceMediaEle = document.createElement('source');
    sourceMediaEle.setAttribute('src',this.source);
    sourceMediaEle.setAttribute('type','video/mp4');
    mediaCard.appendChild(sourceMediaEle);
    mediaCard.classList.add('_articleMedia-media');
    link.appendChild(mediaCard);

    // infos of video
    const infosCard = setMediaInfosCardDom(this.title,this.likes);

    // add to card
    articleMedia.appendChild(link);
    articleMedia.appendChild(infosCard);
    return articleMedia;
  }
}

class Image {
  constructor(data){
    const {photographer, media} = data;
    this.title = media.title;
    this.likes = media.likes;
    this.image = media.image;
    this.name = photographer.name;
    this.source=`assets/images/${this.name.split(' ')[0]}/${this.image}`;
  }

  createImageCard = () =>{
    const articleMedia = document.createElement('article');
    articleMedia.classList.add('_articleMedia');
    // link contains image
    const link = document.createElement('a');
    link.setAttribute('href','#');
    const mediaCard = document.createElement('img');
    mediaCard.setAttribute('src', this.source);
    mediaCard.setAttribute('alt',`${this.title}, closeup view`);
    mediaCard.classList.add('_articleMedia-media');
    link.appendChild(mediaCard);
    // infos of image
    const infosCard = setMediaInfosCardDom(this.title,this.likes);
    // add to card
    articleMedia.appendChild(link);
    articleMedia.appendChild(infosCard);
    return articleMedia;
  }
}

class MediaFactory {

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

  type = (image,video)=>image? 'image': video? 'video':'type inexist';
}




