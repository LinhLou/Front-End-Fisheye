//  get data from the json document
// bien retourner le tableau photographers seulement une fois récupéré

async function getPhotographers() {

  let photographers = [
      {
          "name": "Ma data test",
          "id": 1,
          "city": "Paris",
          "country": "France",
          "tagline": "Ceci est ma data test",
          "price": 400,
          "portrait": "account.png"
      },
      {
          "name": "Autre data test",
          "id": 2,
          "city": "Londres",
          "country": "UK",
          "tagline": "Ceci est ma data test 2",
          "price": 500,
          "portrait": "account.png"
      },
  ]
  // et bien retourner le tableau photographers seulement une fois récupéré
  return ({
      photographers: [...photographers, ...photographers, ...photographers]})
}