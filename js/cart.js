let MONEY_SYMBOL = "$";
let prodCount = 2;
let prodCost = ""
let shipComissionPercentage = 0

function updateTotalCosts(){
    let unitArticleCostHTML = document.getElementById("articleCostText");
    let shipCostHTML = document.getElementById("shipCostText");
    let totalArticleCostHTML = document.getElementById("totalArticleCostText");

    let unitArticleCostToShow = MONEY_SYMBOL + prodCount * prodCost;
    let shipCostToShow = MONEY_SYMBOL + Math.round((shipComissionPercentage * (prodCount * prodCost)));
    let totalArticleCostToShow = MONEY_SYMBOL + Math.round((prodCost * shipComissionPercentage * prodCount)+(prodCost * prodCount));

    unitArticleCostHTML.innerHTML = unitArticleCostToShow;
    shipCostHTML.innerHTML = shipCostToShow;
    totalArticleCostHTML.innerHTML = totalArticleCostToShow;
}
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
                <div class="col-7">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ name + `</h3>
                        <h4 class="mb-1">`+ currency + ` ` + cost + `</h4>
                    </div>
                    <p></p>
                    <table>
                        <tr>
                            <th><h7> Cantidad a comprar:</h7></th> 
                            <th>
                                <input type="number" class="form-control col-3" id="prodCount" placeholder="" value="`+count+`" min="1" >
                            </th>                        
                        </tr> 
                    </table>           
                </div>
            </div>
            <hr>  
        `
        document.getElementById("artCart").innerHTML = cart;
        prodCost = cost
        
        updateTotalCosts();
    
        document.getElementById("prodCount").addEventListener("click", function(){
            prodCount = this.value;
            updateTotalCosts();
        });
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

    document.getElementById("buyBtn").addEventListener("click", function(){
        if(document.querySelector('input[name="shippingType"]:checked') && document.querySelector('input[name="payType"]:checked')){
             alert("Su compra ha sido procesada con exito !");
        }
        else{ alert("Faltó seleccionar método de envío y/o pago")}
    });

});