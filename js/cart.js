let MONEY_SYMBOL = "UYU ";
let prodCount =""
let prodCost = ""
let shipComissionPercentage =""
let paises = []
let PAISES_URL = "http://vocab.nic.in/rest.php/country/json"

function updateTotalCosts(){
    let unitArticleCostHTML = document.getElementsByName("articleCostText")    
    let shipCostHTML = document.getElementById("shipCostText");
    let totalArticleCostHTML = document.getElementById("totalArticleCostText");

    let unitArticleCostToShow = MONEY_SYMBOL + prodCount * prodCost;
    let shipCostToShow = MONEY_SYMBOL + Math.round((shipComissionPercentage * (prodCount * prodCost)));
    let totalArticleCostToShow = MONEY_SYMBOL + Math.round((prodCost * shipComissionPercentage * prodCount)+(prodCost * prodCount));

    //Agregamos el subtotal debajo del precio unitario y en la tabla de costos

    for( i=0 ; i < unitArticleCostHTML.length ; i++){
        unitArticleCostHTML[i].innerHTML = unitArticleCostToShow
    };

    if(shipComissionPercentage ===""){
        shipCostHTML.innerHTML = "No seleccionó tipo de envío"
    }
    else{
    shipCostHTML.innerHTML = shipCostToShow;
    }
    totalArticleCostHTML.innerHTML = totalArticleCostToShow;
}
// Funcion que genera un array con los nombres de los paises
function agregarPais(nombre_pais){
    paises.push(nombre_pais)
};

document.addEventListener("DOMContentLoaded", function(e){

    fetch(CART_INFO_URL)
    .then(content => content.json())
    .then(data =>{
        let cart = "";                   
        let name = data.articles[0].name;       
        let cost = data.articles[0].unitCost;
        let currency = data.articles[0].currency;
        let count = data.articles[0].count
        let imgUrl = data.articles[0].src;       
        cart = `
            <hr>
            <div class="row">
                <div class="col-2">
                    <img src="` + imgUrl + `"class="img-thumbnail">
                </div>
                <div class="col-10">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ name + `</h3>
                        <h4><small>Precio unitario:</small> `+ currency + ` ` +cost + `</h4>
                    </div>
                    <hr>
                    <table>
                        <tr>
                            <th class="col-3"><h7> Cantidad a comprar:</h7></th> 
                            <th>
                                <input type="number" class="form-control col-2" id="prodCount" placeholder="" value="`+count+`" min="1" >
                            </th>
                            <th class="col-1"> Subtotal:</th>  
                            <th class="col-2" name="articleCostText"></th>                      
                        </tr>                         
                    </table>
                    <hr>           
                </div>
            </div> 
            <hr> 
        `
        document.getElementById("artCart").innerHTML = cart;
        prodCost = cost
        prodCount = count        
        updateTotalCosts();

        // Se agregan eventos para recalcular costos dependiento tipo de envio y cantidad de productos seleccionados
                    
        document.getElementById("prodCount").addEventListener("click", function(){
            prodCount = this.value;
            updateTotalCosts();
        });
    
        document.getElementById("estandarradio").addEventListener("click", function(){
            shipComissionPercentage = 0.05;
            updateTotalCosts();
        });
        
        document.getElementById("expressradio").addEventListener("click", function(){
            shipComissionPercentage = 0.07;
            updateTotalCosts();
        });

        document.getElementById("premiumradio").addEventListener("click", function(){
            shipComissionPercentage = 0.13;
            updateTotalCosts();
        });
    });

    //fetch paises
    fetch(PAISES_URL)
    .then(content => content.json())
    .then(data =>{        
        for (i=0; i<data.countries.length; i++){
            nombre_pais = data.countries[i].country.country_name
            agregarPais(nombre_pais)            
        };        
    });

    document.getElementById("pais").addEventListener("click" , function(){

        paises.sort()  

        for(i=0; i<paises.length; i++){
            let option = document.createElement('option');
            option.value = paises[i];
            option.innerHTML = paises[i];
            document.getElementById("pais").appendChild(option); 
        };       
    });

    // habilitamos los input del modal dependiendo la forma de pago seleccionada
    
    let elementos = document.getElementsByClassName("creditCard")
    let radioCard = document.getElementById("creditradio")
    let radioBank = document.getElementById("radioBank")
    let pagoMostrar = ""

    radioCard.addEventListener("click", function(){
        document.getElementById("bankTransfer").disabled = true
        for( i=0 ; i < elementos.length ; i++){
            elementos[i].disabled = false
        };
        pagoMostrar = `El método de pago seleccionado es : <strong>Tarjeta de crédito`
        document.getElementById("pagoSeleccionado").innerHTML = pagoMostrar

    });

    radioBank.addEventListener("click", function(){
        document.getElementById("bankTransfer").disabled = false 
        for( i=0 ; i < elementos.length ; i++){
            elementos[i].disabled = true
        };
        pagoMostrar = `El método de pago seleccionado es : <strong>Transferencia bancaria`
        document.getElementById("pagoSeleccionado").innerHTML = pagoMostrar
    });

    document.getElementById("buyBtn").addEventListener("click", function(){
        let calle = document.getElementById("calle").value
        let esquina = document.getElementById("esq").value
        let numCalle = document.getElementById("numC").value
        let valorPais = document.getElementById("pais").value
        let card = document.getElementById("numCard").value
        let cvv = document.getElementById("cvv").value
        let venc = document.getElementById("venc").value
        let cuenta = document.getElementById("bankTransfer").value
        let errores = []        

        // validamos campos diceccion
        if((calle === "" || calle === " ") || (esquina === "" || esquina === " ") || (numCalle === "" || numCalle === " ") || (valorPais === "Seleccione Pais")){
            errores.push("Dirección no está completa")
        };

        // validamos metodo de envio
        if(!document.querySelector('input[name="shippingType"]:checked')){
            errores.push("No hay metodo de envío seleccionado")
        };

        // Validamos los campos del modal
        if(radioCard.checked){

            if (card === " " || card ===""){
                errores.push("Número de tarjeta");          
            };
            
            if(cvv === " " || cvv ===""){
                errores.push("Código CVV");
            }; 
            
            if(venc === " " || venc ===""){
                errores.push("Vencimiento de la tarjeta")
            };
        };
        
        if(radioBank.checked){
        
            if(cuenta === " "|| cuenta ===""){
                errores.push("Número de cuenta bancaria")
            };
        };      
        
        if((!radioBank.checked) && (!radioCard.checked)){
            errores.push("No hay método de pago seleccionado")
        };

        if(errores.length >0){
            
            let erroresAgregar = `<div div class= "my-3" style="color: red; font-style: italic;font-weight: bold"> Ups ! Parece que faltan datos: `+errores.join(", ")+`</div>`
            document.getElementById("error").innerHTML = erroresAgregar     
        }
        else{

            alert("Todos los datos se han validado con éxito. La compra ha sido completada!!")
            window.location.href = "./cart.html"
        };
    }); 
});