class LightboxGestion{
  constructor(domNode){
    this.domNode = domNode;
    this.closeEle = document.querySelector('#lightbox-close');
    this.arrowRight = domNode.querySelector('.fa-chevron-right');
    this.arrowLeft = domNode.querySelector('.fa-chevron-left');
    this.currentEle = [];

    // open lightbox
    document.body.addEventListener('click',((event)=>this.onClickMedia(event)));
    document.body.addEventListener('keydown',((event)=>this.onKeydownMedia(event)));

    // close lightbox
    this.closeEle.addEventListener('click',this.onClickCloseLightbox);
    this.closeEle.addEventListener('keydown',this.onKeydownCloseLightbox);
    this.domNode.addEventListener('keydown',this.onKeydownCloseLightbox);
    // go to previous media
    this.arrowLeft.addEventListener('click',this.preMedia);
    this.arrowLeft.addEventListener('keydown',this.onKeydownArrowLeft);

    // go to next media
    this.arrowRight.addEventListener('click',this.nextMedia);
    this.arrowRight.addEventListener('keydown',this.onKeydownArrowRight);
  }

  onClickMedia = (event)=>{
    if(event.target.classList.contains('_articleMedia-media')){
      this.openLightbox();
      this.currentMedia(event);
    }
  }

  onKeydownMedia = (event)=>{
    if(event.target.classList.contains('_articleMedia-link')||event.target.classList.contains('_articleMedia-media')){
      const key = event.key;
      switch(key){
        case 'Enter':
          this.openLightbox();
          this.currentMedia(event);
          this.closeEle.focus();
        break;
      }
    }
  }

  onClickCloseLightbox =()=>{
    this.closeLightbox();
    this.mediaFocus();
  }

  onKeydownCloseLightbox= (event)=>{
    const key = event.key;
    switch(key){
      case 'Escape':
        this.closeLightbox();
        this.mediaFocus();
      break;
    }
  }

  onKeydownArrowLeft = (event)=>{
    const key = event.key;
    switch(key){
      case 'Enter':
        this.preMedia();
        break;
      default:
      break;
    }
  }

  onKeydownArrowRight= (event)=>{
    const key = event.key;
    switch(key){
      case 'Enter':
        this.nextMedia();
        break;
      default:
      break;
    }
  }

  // display lightbox
  openLightbox = ()=>{
    this.domNode.style.display = 'flex';
  }

  closeLightbox = ()=>{
    this.domNode.style.display = 'none';
  }
  
  currentMedia = (event)=>{
    this.currentEle = event.target.closest('article');
    this.showMedia(this.currentEle);
  }

  nextMedia = ()=>{
    const nextEle = this.currentEle.nextElementSibling;
    if(nextEle){
      this.showMedia(nextEle);
      this.currentEle = nextEle;
    }else{
      this.currentEle = document.querySelector('._photographeMedias').firstChild;
      this.showMedia(this.currentEle);
    }
  }
  
  preMedia = ()=>{
    const prevEle = this.currentEle.previousElementSibling;
    if(prevEle){
      this.showMedia(prevEle);
      this.currentEle = prevEle;
    }else{
      this.currentEle = document.querySelector('._photographeMedias').lastChild;
      this.showMedia(this.currentEle);
    }
  }
  
  showMedia = (ele)=>{
    const getMediaEle = ()=>ele.querySelector('img')? ele.querySelector('img'):ele.querySelector('video');
    
    const getTitleEle = ele.querySelector('h3');
    const newEle = getMediaEle().cloneNode(true); // duplicate media element
    newEle.setAttribute('class','lightbox_media');

    if(newEle.tagName=='VIDEO'){
      newEle.setAttribute('controls','');
    }
    newEle.removeAttribute('id'); // avoid trigger click event to image.
    const mediaContainer = document.querySelector('.lightbox-media');
    mediaContainer.innerHTML ='';
    mediaContainer.appendChild(newEle);
    const titleEle = document.querySelector('.lightbox-title');
    titleEle.innerHTML = getTitleEle.textContent;
  }
  mediaFocus = ()=>{
    this.currentEle.querySelector('._articleMedia-media').setAttribute('tabindex','0');
    this.currentEle.querySelector('._articleMedia-media').focus();
  }
}


