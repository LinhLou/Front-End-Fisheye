// creat a card DOM for each photographer
function setPhotographerCard(data) {
  const { name,  id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

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
      pSlogan.classList.add('article_logan');
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
  return { name,  id, city, country, tagline, price, picture, setPhotographerCardDOM }
}