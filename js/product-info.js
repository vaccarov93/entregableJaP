 
    function toShow(data){

        let agregar = "";

        for(let i = 0; i < data.length; i++){
            let images = data[i];

            agregar += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
                </div>
            </div>
            `

            document.getElementById("productImagesGallery").innerHTML = agregar;
        };
    };

    function agregarEstrella(score) {
        let estrellas = ""
        let star = 0
        for(let i = 0; i < 5; i++){
            if(star < score){
                estrellas += `
                <span class="fa fa-star checked"></span> 
                `
                star++;   
            }
            
            else{ estrellas += `
            <span class="fa fa-star"></span> 
            `
            }    
        }
        return estrellas;
    };
document.addEventListener("DOMContentLoaded", function(e){
 
    fetch(PRODUCT_INFO_URL)
    .then(content => content.json())
    .then(data =>{
        product = data;

        let relatedIndex = product.relatedProducts
        
        let productNameHTML = document.getElementById("productName");
        let productDescriptionHTML = document.getElementById("productDescription");
        let productCountHTML = document.getElementById("productSoldCount");
        let productCurrencyHTML = document.getElementById("productCurrency");
        let productCategoryHTML = document.getElementById("productCategory");

        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCountHTML.innerHTML = product.soldCount;
        productCurrencyHTML.innerHTML = ``+ product.currency+` `+product.cost;
        productCategoryHTML.innerHTML = product.category
            
        //Muestro las imagenes en forma de galería
        toShow(product.images);

        fetch(PRODUCTS_URL)
        .then(content => content.json())
        .then(data =>{
            let related = "";
            let indice = relatedIndex
        
            for (let i = 0; i < indice.length; i++) { 
                let pos = indice[i]               
                let datos = data[pos]
                let name = datos.name;
                let description = datos.description;
                let cost = datos.cost;
                let currency = datos.currency;
                let imgUrl = datos.imgSrc;
                let sold = datos.soldCount;
                related += `
                        <a href="product-info.html" class="list-group-item list-group-item-action">			
                            <div class="row">
                                <div class="col-3">
                                    <img src="` + imgUrl + `" class="img-thumbnail">;
                                </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1">`+ name + `</h4>
                                        <big class="text-muted">` + currency + ` ` + cost + `</big>                    
                                    </div>
                                    <h7 class="d-flex w-100 justify-content-between">
                                        `+ description + `<small>` + sold + ` artículos</small>
                                    </h7>
                                </div>
                            </div>
                        </a>         
                        `
            };
            document.getElementById("relatedProduct").innerHTML = related;
        });
    });

    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(content => content.json())
    .then(data => {
        let toAppend = ""     

        for (let i = 0; i < data.length; i++) {
            let info = data[i];
            score = info.score
            estrellas = agregarEstrella(score)
            toAppend += `
                
                <dt>`+ info.user + `</dt>
                <p></p>
                <div class="d-flex w-100 justify-content-between">                                          
                    <dd>`+ info.description + `</dd>
                    <dt>`+ estrellas + `</dt>
                </div>
                <dd>`+ info.dateTime + `</dd>
                <hr>
                `
        };
        document.getElementById("comentarios").innerHTML = toAppend;
    });
});