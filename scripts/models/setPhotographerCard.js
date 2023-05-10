// creat a card DOM for each photographer
function setPhotographerCard(photographerData, mediaData) {
  const { name,  id, city, country, tagline, price, portrait } = photographerData;

  const {title,video, image, likes, date}= mediaData;

  const picture = `assets/photographers/${portrait}`;

  const typeMedia = ((video)=> video? 'video':'image')(video);

  const mediaSource = `assets/images/${name.split(' ')[0]}/${(((image, video)=>image? image:video))(image, video)}`;

  //  set card DOM of each photographer
  function setPhotographerCardDOM() {
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.classList.add('article_img');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.classList.add('article_name');
    const pLocation = document.createElement('p');
    pLocation.classList.add('article_location');
    pLocation.textContent = `${city}, ${country}`;
    const pSlogan = document.createElement('p');
    pSlogan.classList.add('article_slogan');
    pSlogan.textContent = tagline;
    const pPrice = document.createElement('p');
    pPrice.classList.add('article_price');
    pPrice.textContent = `${price}€/jour`;
    const article = document.createElement('article');
    article.classList.add('article');
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(pLocation);
    article.appendChild(pSlogan);
    article.appendChild(pPrice);
    return (article);
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

  return { name,  id, city, country, tagline, price, picture, likes, date, mediaSource, setPhotographerCardDOM, setMediaCardDOM }
}