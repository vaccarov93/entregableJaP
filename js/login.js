//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn").addEventListener("click", function(e){
       
        const mail= document.getElementById("correo");
        const pwd = document.getElementById("contrasena");
        let corte = mail.value.indexOf('@') //corte guarda la posisión que ocupa "@" en el valor de mail 
        let mailCortado = mail.value.substring(0, corte) /*substring corta el mail entre la posicion inicial y
        la posición almacenada en corte, correspondiente al @*/

        if(mail.value === ""){
            alert("Hola!!, parece que te falta poner tu mail");
        }
        else if(pwd.value ===""){
            alert("Hola!!, parece que te falta poner tu contraseña");
        }
        /*como mail y pwd tienen algún valor entra en el ultimo else y guarda en "user" la porción del mail
        que esta antes del @*/
        else{ 
            sessionStorage.setItem('user', mailCortado)
            window.location.href = "./home.html";
        };
    });
});
