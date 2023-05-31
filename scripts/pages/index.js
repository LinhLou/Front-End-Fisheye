// display photographer infos
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = setPhotographerCard(photographer);
            const photographerCardDOM = photographerModel.setPhotographerCardDOM();
            photographersSection.appendChild(photographerCardDOM);
            // add link to photographer
            const link = document.createElement('a');
                link.setAttribute("href",`../../photographer.html#${photographer.id}`);
                link.setAttribute("aria-label",photographer.name);
                link.classList.add('article_link');
            link.appendChild(photographerCardDOM.children[0]);
            link.appendChild(photographerCardDOM.children[0]);
            photographerCardDOM.insertBefore(link,photographerCardDOM.firstChild);

        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getData();
        displayData(photographers);
    }
    
    init();
    
