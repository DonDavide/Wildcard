window.onload = function (e) {

    var email = document.querySelector('#email');
    var password = document.querySelector('#password');
    var formulario = document.querySelector('.auxiliarInputsContainer')

    //EMAIL BLUR

    email.addEventListener('blur', function(event){
        if(email.value == ""){
            event.preventDefault();
                var emailError = document.querySelector('#emailError');
                emailError.innerHTML = "<li>" + "El campo Email no puede estar vacio." + "</li>"
            } else if (email.value.includes("@")==false){
                var emailError = document.querySelector('#emailError');
                emailError.innerHTML = "<li>" + "El Email no es valido." + "</li>"
            }
    })

     //CONTRASEÑA BLUR

    password.addEventListener('blur', function(event){
        if(password.value == ""){
            event.preventDefault();
                var passwordError = document.querySelector('#passwordError');
                passwordError.innerHTML = "<li>" + "El campo Contraseña no puede estar vacio." + "</li>"
            }else if(password.value.length < 6){
                var passwordError = document.querySelector('#passwordError');
                passwordError.innerHTML = "<li>" + "La contraeña tiene un minimo de 6 caracteres" + "</li>"
     
            }
    })


   

    formulario.addEventListener("submit", function(event){
        //EMAIL
        if(email.value == ""){
        event.preventDefault();
            var emailError = document.querySelector('#emailError');
            emailError.innerHTML = "<li>" + "El campo Email no puede estar vacio." + "</li>"
        } else if (email.value.includes("@")==false){
            var emailError = document.querySelector('#emailError');
            emailError.innerHTML = "<li>" + "El Email no es valido." + "</li>"
        }
        //CONTRASEÑA
        if(password.value == ""){
        event.preventDefault();
            var passwordError = document.querySelector('#passwordError');
            passwordError.innerHTML = "<li>" + "El campo Contraseña no puede estar vacio." + "</li>"
        }else if(password.value.length < 6){
            var passwordError = document.querySelector('#passwordError');
            passwordError.innerHTML = "<li>" + "La contraeña tiene un minimo de 6 caracteres" + "</li>"
 
        }

    })
}