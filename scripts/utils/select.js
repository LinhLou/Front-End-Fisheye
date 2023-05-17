class MenuSelectNavigation {
  constructor(domNode){
     this.domNode = domNode;
     this.btnSelect = domNode.querySelector('._select-btn');
     this.itemSelect = domNode.querySelectorAll('._select-item');
     this.arrowSelect = domNode.querySelector('.fa-chevron-down');
     this.listSelect = domNode.querySelector('._select-list');
    //  add event click and keydown to btn
    this.btnSelect.addEventListener('click',this.onBtnClick);
    this.btnSelect.addEventListener('keydown',((event)=>this.onBtnKeydown(event)));
    // add event click, mouseover and keydown to option Select
    this.itemSelect.forEach((ele)=>{
      ele.addEventListener('click',((event)=>this.onOptionClick(event.target)));
    });
    this.itemSelect.forEach((ele)=>{
      ele.addEventListener('mouseover',((event)=>this.isMouseOver(event.target)));
    });
    this.itemSelect.forEach((ele)=>{
      ele.addEventListener('keydown',((event)=>this.onOptionKeydown(event)));
    });

  }

  // event handlers
  onBtnClick = ()=>{
    this.openSelectMenu();
  }

  onBtnKeydown = (event)=>{
    const key = event.key;
    let flag = false;
    switch(key){
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'Down':
        this.openSelectMenu();
        this.setFocusToFirstOption();
        flag = true;
        break;
      case 'ArrowUp':
      case 'Up':
        this.openSelectMenu();
        this.setFocusToLastOption();
        flag = true;
        break;

      default:
        break;
    }
    if(flag){
      event.preventDefault();
    }
  }

  onOptionClick = (ele)=>{
    this.isSelectedOption(ele);
    this.closeSelectMenu();
  }

  onOptionKeydown = (event)=>{
    const key = event.key;
    const target = event.target;
    let flag = false;
    switch(key){
      case 'Up':
      case 'ArrowUp':
        this.setFocusToPreviousOption(target);
        flag = true;
        break;
      case 'Down':
      case 'ArrowDown':
        this.setFocusToNextOption(target);
        flag = true;
        break;
      case 'Enter':
      case ' ':
        this.isSelectedOption(target);
        this.closeSelectMenu();
        flag = true;
        break;
      case 'Escape':
        this.closeSelectMenu();
        flag = true;
        break;
      default:
        this.closeSelectMenu();
      break;
    }

    if(flag){
      event.preventDefault();
    }
  }
  
  // menu select handlers 
  openSelectMenu=()=>{
    // show options
    this.listSelect.focus();
    this.listSelect.classList.toggle('_select-list--visible');
    this.arrowSelect.classList.toggle('_select-arrow--up');
    // the menu is open
    this.btnSelect.setAttribute('aria-expanded','true');
  }
  closeSelectMenu=()=>{
    this.listSelect.classList.toggle('_select-list--visible');
    this.arrowSelect.classList.toggle('_select-arrow--up');
    this.btnSelect.setAttribute('aria-expanded','false');
    this.btnSelect.focus();
  }

  // option focus handlers
  setFocusToOption=(ele)=>{
    ele.focus();
    this.listSelect.setAttribute('aria-activedescendant',ele.id);
  }
  setFocusToFirstOption=()=>{
    this.setFocusToOption(this.itemSelect[0]);
  }
  setFocusToLastOption=()=>{
    this.setFocusToOption(this.itemSelect[this.itemSelect.length-1]);
  }
  setFocusToNextOption = (currentOption)=>{
    const indexCurrentOption = [...this.itemSelect].findIndex((ele)=>ele.id===currentOption.id);
    const nextOption = this.itemSelect[indexCurrentOption+1];
    if(indexCurrentOption<this.itemSelect.length-1){
      nextOption.focus();
      this.listSelect.setAttribute('aria-activedescendant',nextOption.id);
    }else{
      this.setFocusToFirstOption();
    }
  }

  setFocusToPreviousOption = (currentOption)=>{
    const indexCurrentOption = [...this.itemSelect].findIndex((ele)=>ele.id===currentOption.id);
    const preOption = this.itemSelect[indexCurrentOption-1];
    if(indexCurrentOption>0){
      preOption.focus();
      this.listSelect.setAttribute('aria-activedescendant',preOption.id);
    }else{
      this.setFocusToLastOption();
    }
  }

  // 
  isSelectedOption(ele){
    ele.classList.add('_select-item--selected');
    ele.setAttribute('aria-selected','true');
    [...this.itemSelect].filter((item)=>item.id!==ele.id).forEach((e)=>{
      e.classList.remove('_select-item--selected'); // remove all selected style from elements not been selected
      e.removeAttribute('aria-selected');
    });
    this.btnSelect.innerHTML=ele.textContent;
    initMedia();
  }

  isMouseOver(ele){
    this.listSelect.setAttribute('aria-activedescendant',ele.id);
  }
}


const selectSection = document.querySelector('._select');
const action = new MenuSelectNavigation(selectSection);

