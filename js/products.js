//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"



        fetch(url)
            .then(content => content.json())
            .then(data =>{
                
                for(let i=0;i < data.length; i ++){
                    let datos = data[i];
                    let name = datos.name;
                    let description = datos.description;
                    let cost = datos.cost;
                    let currency = datos.currency;
                    let imgUrl = datos.imgSrc;
                    let sold = datos.soldCount;

                    let agregar = "";

                    agregar += `				
                    <div class="row">
                        <div class="col-3">
                            <img src="` + imgUrl + `" class="img-thumbnail">;
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ name +`</h4>
                                <big class="text-muted">` + currency+` `+cost + `</big>                    
                            </div>
                            <h7 class="d-flex w-100 justify-content-between">
                                `+ description + `<small>` + sold + ` artículos</small>
                            </h7>
                        </div>
                    </div>         
                    `
                    document.getElementById("contenido").innerHTML += agregar;
                };      
            });


});