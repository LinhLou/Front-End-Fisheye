class CheckInput{
    check = (ele)=>{
        const type = ele.id;
        const value = ele.value;
        switch(type){
            case 'nom':
                return this.checkNom(value);
            case 'prenom':
                return this.checkPrenom(value);
            case 'email':
                return this.checkEmail(value);
            default:
                return {condition:true,
                        errorMes:' '};
        }
    }

    checkNom = (text)=>{
        if(text.length>2){
            return {condition:true,
                    errorMes:' '};
        }else{
            return {condition: false,
                    errorMes: 'Veuillez entrer un nom ayant au moins 2 charactères'};
        }
    }

    checkPrenom = (text)=>{
        if(text.length>=2){
            return {condition:true,
                    errorMes:' '};
        }else{
            return {condition: false,
                    errorMes: 'Veuillez entrer un prénom ayant au moins 2 charactères'};
        }
    }

    checkEmail = (email)=>{
        const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(regExp.test(email)){
            return {condition:true,
                    errorMes:' '};
        }else{
            return {condition: false,
                    errorMes: 'Veuillez entrer un adresse email correct'};
        }
    }

}

class ModalGestion{
    constructor(domNode){
        this.domNode = domNode;
        this.modal = domNode.querySelector('.modal');
        this.closeX  = domNode.querySelector('.modal-close');
        this.btnSend = domNode.querySelector('#btnSendContact');
        this.inputEles = domNode.querySelectorAll('.formData-text');
        this.formEle = domNode.querySelector('.form');
        this.headerEle = domNode.querySelector('#modal-heading');

        // add event to open modal
        document.body.addEventListener('click',((event)=>this.onClickBtn(event)));

        document.body.addEventListener('keydown',((event)=>this.onKeydownBtn(event)));


        // add event to close btn
        this.closeX.addEventListener('click',this.closeModal);
        this.closeX.addEventListener('keydown',this.onCloseKeydown);
        this.modal.addEventListener('keydown', this.onCloseKeydown);
        // add event to submit btn
        this.formEle.addEventListener('submit',((event)=>this.onSubmit(event)));
        // add event to check input modal
        this.inputEles.forEach((ele)=>{ele.addEventListener('input',((event)=>{
            this.inputErrorMessageGestion(event.target)}));});

        this.btnSend.addEventListener('keydown',((event)=>this.onKeydownBtnSend(event)));
    }

    addName =(name)=>{
        this.headerEle.innerHTML = `Contactez-moi <br> ${name}`;
    }
    
    // open and close modal
    displayModal = () => {
        this.modal.className='modal modal--aniOpen'; 
        this.domNode.style.display = "flex";
        this.modal.focus();
    }

    onClickBtn = (event)=>{
        if(event.target.id=='button-Contact'){
            this.displayModal();
        }
    }

    onKeydownBtn = (event)=>{
        if(event.target.id=='button-Contact'){
            const key = event.key;
            switch(key){
                case 'Enter':
                    this.displayModal();
                    break;
                default:
                    break;
            }
        }
    }

    closeModal = () => {
        const btnContact = document.getElementById('button-Contact');
        this.modal.className='modal modal--aniClose';
        setTimeout(()=>{this.domNode.style.display = "none"},400);
        btnContact.focus();
    }

    inputErrorMessageGestion = (ele)=>{
        // check if condition is satisfied ->style valid else modify it to invalid style and show error messages
        const inputObj = new CheckInput();
        const inputInfos = inputObj.check(ele);

        const {condition, errorMes} = inputInfos;
        if(!condition){
            this.showErrorMessage(ele,errorMes);
        }else{
            this.removeErrorMessage(ele);
        }
    }

    onCloseKeydown =(event)=>{
        const key = event.key;
        switch(key){
            case 'Escape':
                this.closeModal();
                break;
            default:
                break;
        }
    }

    onKeydownBtnSend = (event)=>{
        const key = event.key;
        switch(key){
            case 'Enter':
                this.submitGestion(event);
                break;
            default:
                break;
        }      
    }
    onSubmit=(event)=>{
        this.submitGestion(event);
    }

    formAnimationGestion = ()=>{
        if(!this.modal.classList.contains('modal-aniFormInvalid')){
            this.modal.classList.toggle('modal-aniFormInvalid');
        }else{
            this.modal.classList.toggle('modal-aniFormInvalidRepeat');
        }
    }

    showUserInfos = ()=>{
        [...this.inputEles].forEach((ele)=>{
            console.log(`${ele.labels[0].textContent}: ${ele.value}`);
        })
    }
    showErrorMessage = (ele,message)=>{
        ele.classList.remove('formData-text--valid');
        if(!ele.classList.contains('formData-text--invalid')){
            ele.classList.add('formData-text--invalid');
        }
        ele.parentElement.setAttribute('data-error', message);
    }
    removeErrorMessage = (ele)=>{
        ele.classList.remove('formData-text--invalid');
        if(!ele.classList.contains('formData-text--valid')){
            ele.classList.add('formData-text--valid');
        }
        ele.parentElement.removeAttribute('data-error');

    }

    submitGestion = (event)=>{
        event.preventDefault();
        //check if all input is valid
        const conditionInputs = [...this.inputEles].map((ele)=>{const checkEle = new CheckInput(); return checkEle.check(ele);});

        const conditionForm = conditionInputs.reduce((acc,ele)=>acc*ele.condition,true);
        if(conditionForm){
            this.showUserInfos();
            this.closeModal();
        }else{
            [...this.inputEles].forEach((ele)=>{
                this.inputErrorMessageGestion(ele);
            });
            this.formAnimationGestion();
        }
    }

}



