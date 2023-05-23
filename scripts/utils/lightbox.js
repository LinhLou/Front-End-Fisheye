
class LightboxGestion{
  constructor(domNode,photographer,medias){
    this.domNode = domNode;
    this.closeEle = document.querySelector('#lightbox-close');
    this.arrowRight = domNode.querySelector('.fa-chevron-right');
    this.arrowLeft = domNode.querySelector('.fa-chevron-left');
    this.medias = medias;
    this.idMedias = medias.map((a)=>a.id);

    console.log(this.arrowLeft);
    document.body.addEventListener('click',((event)=>this.onClick(event)));
    this.closeEle.addEventListener('click',this.closeLightbox);

  }

  onClick = (event)=>{
    const idMedia = Number(event.target.id);
    if(this.idMedias.includes(idMedia)){
      this.openLightbox();
      this.currentMedia(event.target);
    }
    
  }

  // display lightbox
  openLightbox = ()=>{
    this.domNode.style.display = 'flex';
  }

  closeLightbox = ()=>{
    this.domNode.style.display = 'none';
  }
  
  currentMedia = (currentEle)=>{
    const indexMedia=this.idMedias.indexOf(Number(currentEle.id));
    const mediaContainer = document.querySelector('.lightbox-media');
      mediaContainer.innerHTML ='';
    const titleEle = document.querySelector('.lightbox-title');
    const getTitle = currentEle.closest('article').querySelector('h3').textContent;
      titleEle.innerHTML=getTitle;
    const newEle = currentEle.cloneNode(true);
    newEle.removeAttribute('id'); // avoid trigger click event to image.
    newEle.setAttribute('class','lightbox_media');
    mediaContainer.appendChild(newEle);
    console.log(indexMedia);
    return indexMedia;
  }

  nextMedia = ()=>{

  }

  preMedia = ()=>{

  }

}

