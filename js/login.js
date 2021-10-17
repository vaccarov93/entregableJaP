//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn").addEventListener("click", function(e){
       
        let mail= document.getElementById("correo").value;
        let pwd = document.getElementById("contrasena").value;
        let mailAgregar = ""

        if(mail === ""){
            alert("Hola!!, parece que te falta poner tu mail");
        }
        else if(pwd === ""){
            alert("Hola!!, parece que te falta poner tu contraseña");
        }
        /*como mail y pwd tienen algún valor entra en el ultimo else y guarda en "user" la porción del mail
        que esta antes del @ */
        
        if(mail.includes("@")){ 
            let corte = mail.indexOf('@'); //corte guarda la posisión que ocupa "@" en el valor de mail 
            mailAgregar = mail.substring(0, corte); /*substring corta el mail entre la posicion inicial y la posición almacenada en corte, correspondiente al @*/
        } 
        else if(mail !==""){ 
            mailAgregar = mail;
        };
        if(mail !== "" && pwd !== ""){
        localStorage.setItem('user', mailAgregar)
        window.location.href = "./home.html"; 
        };
    });
});
