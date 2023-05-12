const btnSelect = document.querySelector('._select-btn');
  const arrowSelect = document.querySelector('.fa-chevron-down');
  const itemSelect = document.querySelectorAll('._select-item');
  const listSelect = document.querySelector('._select-list');
  
  const selectOption =['Popularité','Date','Title'];
  
  btnSelect.addEventListener('click',(()=>{ 
    const indexEle=selectOption.findIndex((ele) =>ele==btnSelect.textContent);
    listSelect.classList.toggle('_select-list--visible');
    arrowSelect.classList.toggle('_select-arrow--up');
  }));
  
  itemSelect.forEach((ele)=>{
    ele.addEventListener('click',(()=>{
      listSelect.classList.toggle('_select-list--visible');
      arrowSelect.classList.toggle('_select-arrow--up');
      btnSelect.innerHTML=ele.textContent;
      initMedia();
    }));
  })
