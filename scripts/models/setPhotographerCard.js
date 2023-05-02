// creat a card DOM for each photographer
function setPhotographerCard(data) {
  const { name,  city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function setPhotographerCardDOM() {
    // link
    const link = document.createElement('a');
      const img = document.createElement( 'img' );
          img.setAttribute("src", picture);
          img.setAttribute("alt", name);
      const h2 = document.createElement( 'h2' );
          h2.textContent = name;
    link.setAttribute("href","#");
    link.classList.add('photographerCard_link');
    link.appendChild(img);
    link.appendChild(h2);
    // infos
    const divInfos = document.createElement('div');
      const pLocation = document.createElement( 'p' );
          pLocation.classList.add('photographerCard_infos-location');
          pLocation.textContent = `${city}, ${country}`;
      const pSlogan = document.createElement( 'p' );
          pSlogan.classList.add('photographerCard_infos-logan');
          pSlogan.textContent = tagline;
      const pPrice = document.createElement( 'p' );
          pPrice.classList.add('photographerCard_infos-price');
          pPrice.textContent = `${price}€/jour`;
    divInfos.classList.add('photographerCard_infos');
    divInfos.appendChild(pLocation);
    divInfos.appendChild(pSlogan);
    divInfos.appendChild(pPrice);
    // card
    const article = document.createElement( 'article' );
    article.classList.add('photographerCard');
    article.appendChild(link);
    article.appendChild(divInfos);
      return (article);
  }
  return { name,  city, country, tagline, price, picture, setPhotographerCardDOM }
}