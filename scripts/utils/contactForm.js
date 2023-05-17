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
        if(text.length>2){
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
        this.closeX  = domNode.querySelector('.modal-close');
        this.btnSend = domNode.querySelector('#btnSendContact');
        this.inputEles = domNode.querySelectorAll('.formData-text');

        // add event to check modal
        this.inputEles.forEach((ele)=>{ele.addEventListener('input',((event)=>{
            this.onInputCheck(event.target)}));});
        this.inputEles.forEach((ele)=>{ele.addEventListener('click',this.onInputFocus)});
        this.inputEles.forEach((ele)=>{ele.addEventListener('keydown',this.onInputKeydown)});

        // add event to open modal
        document.body.addEventListener('click',((event)=>{
            if(event.target.id=='button-Contact'){
                this.displayModal();
            }
        }));
        // add event to close btn
        this.closeX.addEventListener('click',this.closeModal);
        // add event to submit btn
        this.btnSend.addEventListener('click',((event)=>this.onSubmit(event)));
    }


document.querySelector('._photographeIntro').addEventListener('click',((event)=>{// event delegation
    if(event.target.id=='button-Contact'){
        displayModal();
    }

    closeModal = () => {
        const modalContact = document.getElementById("contact_modal");
        const modal = document.querySelector('.modal');
        modal.classList.toggle('modal--aniClose');
        setTimeout(()=>{modalContact.style.display = "none"},400);
    }



    onInputCheck = (ele)=>{
        // check if condition is satisfied ->style valid else modify to invalid style and show error messages
        const inputObj = new CheckInput();
        const inputInfos = inputObj.check(ele);

        const {condition, errorMes} = inputInfos;
        if(!condition){
            this.showErrorMessage(ele,errorMes);
        }else{
            this.removeErrorMessage(ele);
        }
    }

    
    onInputFocus = ()=>{
        this.inputEles.forEach((input)=>{})
    }
    
    onInputKeydown = ()=>{
        
    }
    onSubmit=(event)=>{
        event.preventDefault();
        //check if all input is valid
        const checkInputsArray = [...this.inputEles].map((ele)=>{const checkEle = new CheckInput(); return checkEle.check(ele);});

        const conditionForm = checkInputsArray.reduce((acc,ele)=>acc*ele.condition,true);
        if(conditionForm){
            this.showUserInfos();
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

}



