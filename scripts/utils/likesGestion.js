class LikesGestion{
  constructor(domNode){
    this.mediaSections = domNode;
    this.mediasLikesInfos =[];
    // event click to heart
    document.body.addEventListener('click',((event)=>this.onClickHeart(event)));
    // event keydown to heart
    document.body.addEventListener('keydown',((event)=>this.onKeydownHeart(event)));
  }

  onClickHeart = (event)=>{
    const tag = event.target;
    const idMedia = tag.id;
    if(tag.classList.contains('fa-heart')){
      this.likeGestion(tag,idMedia);
      this.updateTotalLikes();
    }
  }
  onKeydownHeart = (event)=>{
    const tag = event.target;
    const idMedia = tag.id;
    const key = event.key;
    if(tag.classList.contains('fa-heart')){
      switch(key){
        case 'Enter':
          this.likeGestion(tag,idMedia);
          this.updateTotalLikes();
          break;
        default:
          break;
      }
    }
  }

  updateTotalLikes = ()=>{
    const heartAfficheEles = this.mediaSections.querySelectorAll('p');
    // calcul total likes
    const sumLikes = [...heartAfficheEles].reduce((sum,ele)=>sum+Number(ele.innerHTML),0);
    // affiche total likes
    const totalLikesAfficheEle = document.querySelector('.totalLikes');
    totalLikesAfficheEle.innerHTML = sumLikes;
  }

  likeGestion =(heartEle,idMedia)=>{
    const likesAffiEle = heartEle.previousElementSibling;
    const nbrLikes = likesAffiEle.innerHTML;
    if(!this.isClicked(idMedia)){
      likesAffiEle.innerHTML = Number(nbrLikes)+1 ;
      this.mediasLikesInfos =[...this.mediasLikesInfos, {id:idMedia,nbrClicked:1}];
    }else{
      const index = this.mediasLikesInfos.indexOf(this.mediasLikesInfos.filter((a)=>a.id==idMedia)[0]);
      this.mediasLikesInfos[index].nbrClicked += 1;

      if(!Math.abs(this.isClicked(idMedia) % 2)){
        likesAffiEle.innerHTML = Number(nbrLikes)-1 ;
      }else{
        likesAffiEle.innerHTML = Number(nbrLikes)+1 ;
      }
    } 
  }

  isClicked = (idMedia)=>{
    if(!this.mediasLikesInfos.map((a)=>a.id).includes(idMedia)){
      return 0;
    }else{
      return this.mediasLikesInfos.filter((a)=>a.id==idMedia)[0].nbrClicked;
    }
  }

}

const mediaSection = document.querySelector('._photographeMedias');
const likesGestionObj = new LikesGestion(mediaSection);