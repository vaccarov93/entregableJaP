function setUpdateJson() {
    
    datosusuario = {
        "p_nombre": document.getElementById("pNom").value,
        "s_nombre": document.getElementById("sNom").value,
        "p_apellido": document.getElementById("pApe").value,
        "s_apellido": document.getElementById("sApe").value,
        "fecha_nac": document.getElementById("fNac").value,
        "telefono": document.getElementById("tel").value,
        "mail": document.getElementById("mail").value
    }
    localStorage.setItem("dataUser", JSON.stringify(datosusuario));
};

function getJsonData(datosMostrar){

    document.getElementById("pNom").value = datosMostrar.p_nombre;
    document.getElementById("sNom").value = datosMostrar.s_nombre;
    document.getElementById("pApe").value = datosMostrar.p_apellido;
    document.getElementById("sApe").value = datosMostrar.s_apellido;
    document.getElementById("fNac").value = datosMostrar.fecha_nac;
    document.getElementById("tel").value = datosMostrar.telefono;
    document.getElementById("mail").value = datosMostrar.mail;
    
};

document.addEventListener("DOMContentLoaded", function (e) {    
    
    document.getElementById("saveBtn").addEventListener("click",function(){
        setUpdateJson()
        alert("datos cargados")  
    });
    let datosMostrar = JSON.parse(localStorage.getItem("dataUser"))
    getJsonData(datosMostrar)  
});