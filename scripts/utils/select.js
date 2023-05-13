const btnSelect = document.querySelector('._select-btn');
const arrowSelect = document.querySelector('.fa-chevron-down');
const itemSelect = document.querySelectorAll('._select-item');
const listSelect = document.querySelector('._select-list');
const selectOption =['Popularité','Date','Title'];
  
btnSelect.addEventListener('click',(()=>{ 
  openSelectMenu();
}));

itemSelect.forEach((ele)=>{
  ele.addEventListener('click',((e)=>{
    selectedOption(e.target);
    closeSelectMenu();
  }));
})

  function openSelectMenu(){
    // show options
    listSelect.classList.toggle('_select-list--visible');
    arrowSelect.classList.toggle('_select-arrow--up');
    // the menu is open
    btnSelect.setAttribute('aria-expanded','true');
  }

  function closeSelectMenu(){
    listSelect.classList.toggle('_select-list--visible');
    arrowSelect.classList.toggle('_select-arrow--up');
    btnSelect.setAttribute('aria-expanded','false');
  }

  function selectedOption(ele){
    listSelect.setAttribute('aria-activedescendant',ele.id);
    ele.classList.add('_select-item--selected');
    ele.setAttribute('aria-selected','true');
    [...itemSelect].filter((item)=>item.id!==ele.id).forEach((e)=>{
      e.classList.remove('_select-item--selected'); // remove all selected style from elements not been selected
      e.removeAttribute('aria-selected');
    });
    btnSelect.innerHTML=ele.textContent;
    initMedia();
  }
