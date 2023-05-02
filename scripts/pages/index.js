// display photographer infos
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = setPhotographerCard(photographer);
            const photographerCardDOM = photographerModel.setPhotographerCardDOM();
            photographersSection.appendChild(photographerCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographersInfos();
        displayData(photographers);
    };
    
    init();
    
