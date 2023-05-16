function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


document.querySelector('._photographeIntro').addEventListener('click',((event)=>{// event delegation
    if(event.target.id=='button-Contact'){
        displayModal();
    }
}));


