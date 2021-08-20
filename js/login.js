//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn").addEventListener("click", function(e){
       
        const mail= document.getElementById("correo");
        const pwd = document.getElementById("contrasena");
        
        if(mail.value === ""){
            alert("Hola!!, parece que te falta poner tu mail");
        }
        else if(pwd.value ===""){
            alert("Hola!!, parece que te falta poner tu contraseña");
        }
        else{
            window.location.href = "./home.html";
        };
    });
});
