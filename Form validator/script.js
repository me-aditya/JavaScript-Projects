const form = document.getElementById('form') ;
const username = document.getElementById('username') ;
const email = document.getElementById('email') ;
const password = document.getElementById('password') ;
const password2 = document.getElementById('password2') ;

//Error
function showErr(name,msg) {
    const formControl = name.parentElement ;
    formControl.className = 'form-control error' ;
    const small = formControl.querySelector('small') ;
    small.innerHTML = msg ;
}

//Success 
function showSuccess(name) {
    const formControl = name.parentElement ;
    formControl.className = 'form-control success' ;
}

//Check email is valid
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showErr(input,'Email is not valid.');
    }
}

//Check password match
function checkPasswordMatch(input1,input2) {
    if(input1.value !== input2.value){
        showErr(input2,'Passwords do not match')
    }
}

//Check Required
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
        showErr(input,`${getFieldName(input)} is required`) ;
    }else{
        showSuccess(input);
        }
    })
}

//Check Length 
function checkLength(input,min,max) {
    if(input.value.length < min ){
        showErr(input,`${getFieldName(input)} must be atleast ${min} characters.`);
    }else if(input.value.length >max) {
        showErr(input,`${getFieldName(input)} must be less than ${max} characters.`);
    }else{
        showSuccess(input);
    }
}

// Get Field Name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Lisntners
form.addEventListener('submit' , el => {
    el.preventDefault() ;
    
//    checkRequired(email);
//    checkRequired(password);
//    checkRequired(username);
//    checkRequired(password2);
//    instead of passing in above manner we will pass array
    
    checkRequired([username,email,password,password2]);
    checkLength(username,6,12);
    checkLength(password,8,14);
    checkEmail(email);
    checkPasswordMatch(password,password2);
    
});