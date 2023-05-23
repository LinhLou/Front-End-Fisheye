class LightboxGestion{
  constructor(domNode){
    this.domNode = domNode;
    this.closeEle = document.querySelector('#lightbox-close');
    this.arrowRight = domNode.querySelector('.fa-chevron-right');
    this.arrowLeft = domNode.querySelector('.fa-chevron-left');
    this.currentEle = [];

    // open lightbox
    document.body.addEventListener('click',((event)=>this.onClickMedia(event)));
    // close lightbox
    this.closeEle.addEventListener('click',this.closeLightbox);
    // go to previous media
    this.arrowLeft.addEventListener('click',this.preMedia);
    // go to next media
    this.arrowRight.addEventListener('click',this.nextMedia);
  }

  onClickMedia = (event)=>{
    if(event.target.classList.contains('_articleMedia-media')){
      this.openLightbox();
      this.currentEle = event.target.closest('article');
      this.showMedia(this.currentEle);
    }
  }

  // display lightbox
  openLightbox = ()=>{
    this.domNode.style.display = 'flex';
  }

  closeLightbox = ()=>{
    this.domNode.style.display = 'none';
  }
  

  nextMedia = ()=>{
    const nextEle = this.currentEle.nextElementSibling;
    if(nextEle){
      this.showMedia(nextEle);
      this.currentEle = nextEle;
    }else{
      console.log('helllo');
    }

  }
  
  preMedia = ()=>{
    const prevEle = this.currentEle.previousElementSibling;
    if(prevEle){
      this.showMedia(prevEle);
      this.currentEle = prevEle;
    }else{
      console.log('helllo');
    }
  }
  
  showMedia = (ele)=>{
    const getMediaEle = ()=>ele.querySelector('img')? ele.querySelector('img'):ele.querySelector('video');

    const getTitleEle = ele.querySelector('h3');
    const newEle = getMediaEle().cloneNode(true); // duplicate media element
    newEle.setAttribute('class','lightbox_media');
    newEle.removeAttribute('id'); // avoid trigger click event to image.
    const mediaContainer = document.querySelector('.lightbox-media');
    mediaContainer.innerHTML ='';
    mediaContainer.appendChild(newEle);
    const titleEle = document.querySelector('.lightbox-title');
    titleEle.innerHTML = getTitleEle.textContent;
  }
}


const lightboxEle = document.querySelector('.lightbox-container');
const lightbox = new LightboxGestion(lightboxEle);