const ASC_BY_Cost = "lower to higher";
const DESC_BY_Cost = "higher to lower";
const DESC_BY_SoldCount = "Cant.";
const ORIGIN = ""
var currentProductArray = [];
var currentSortCriteria = undefined;
var maxPrice = undefined;
var minPrice = undefined;

function ordenar(criterio, data) {
	let ordenados = [];
	if (criterio === ORIGIN) {
		ordenados = data
	} else if (criterio === DESC_BY_SoldCount) {
		ordenados = data.sort(function (a, b) {//descendente en fncion de relevancia
			if (a.soldCount > b.soldCount) { return -1; };
			if (a.soldCount < b.soldCount) { return 1; };
			return 0;
		});
	} else if (criterio === DESC_BY_Cost) {
		ordenados = data.sort(function (a, b) {//Descendente en funcion del costo
			if (a.cost > b.cost) { return -1; };
			if (a.cost < b.cost) { return 1; };
			return 0;
		});
	} else if (criterio === ASC_BY_Cost) {
		ordenados = data.sort(function (a, b) {//Ascendente en funcion del costo
			if (a.cost < b.cost) { return -1; };
			if (a.cost > b.cost) { return 1; };
			return 0;
		});
	};
	return ordenados;
};

function mostrarContenido() {
	let agregar = "";
	for (let i = 0; i < currentProductArray.length; i++) {
		let datos = currentProductArray[i];
		let name = datos.name;
		let description = datos.description;
		let cost = datos.cost;
		let currency = datos.currency;
		let imgUrl = datos.imgSrc;
		let sold = datos.soldCount;
		if (((minPrice == undefined) || (minPrice != undefined && parseInt(cost) >= minPrice)) &&
			((maxPrice == undefined) || (maxPrice != undefined && parseInt(cost) <= maxPrice))) {

			//en la la primera linea de agregar se incluye el link que redirige a la información de los productos
			agregar += `
				<div class="col-md-6">
					<a href="product-info.html" class="card mb-4 shadow-sm custom-card">
						<img class="bd-placeholder-img card-img-top" src="` + imgUrl + `">
						<h3 class="m-3">`+ name + `</h3>
						<div class="card-body">
							<p class="card-text">`+ description +`</p>
							<h5 class="m-3">`+ currency + ` ` + cost + `</h5>
							<small class="m-3">` + sold + ` artículos han sido vendidos </small>
						</div>
									
					</a>
				</div>        
			`
		};
		document.getElementById("contenido").innerHTML = agregar;
	};
};
function sortAndShowProducts(sortCriteria, productArray) {
	currentSortCriteria = sortCriteria;

	if (productArray != undefined) {
		currentProductArray = productArray;
	}

	currentProductArray = ordenar(currentSortCriteria, currentProductArray);
	mostrarContenido();
};

document.addEventListener("DOMContentLoaded", function (e) {
	fetch(PRODUCTS_URL)
		.then(content => content.json())
		.then(data => {
			sortAndShowProducts(ORIGIN, data);
		});

	document.getElementById("sortDescCant").addEventListener("click", function () {
		sortAndShowProducts(DESC_BY_SoldCount);
	});
	document.getElementById("sortDscPrice").addEventListener("click", function () {
		sortAndShowProducts(DESC_BY_Cost)
	});
	document.getElementById("sortAscPrice").addEventListener("click", function () {
		sortAndShowProducts(ASC_BY_Cost)
	});
	document.getElementById("clearRangeFilterPrice").addEventListener("click", function () {
		document.getElementById("rangeFilterPriceMin").value = "";
		document.getElementById("rangeFilterPriceMax").value = "";

		maxPrice = undefined;
		minPrice = undefined;

		mostrarContenido();
	});

	/////////////////////////////////////////////////////////////////////  rango de precio definido  ///////////////////////////////////////////////////////////////////////////

	document.getElementById("rangeFilterPrice").addEventListener("click", function () {
		maxPrice = document.getElementById("rangeFilterPriceMax").value;
		minPrice = document.getElementById("rangeFilterPriceMin").value;

		if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
			minPrice = parseInt(minPrice);
		}
		else {
			minPrice = undefined;
		};

		if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
			maxPrice = parseInt(maxPrice);
		}
		else {
			maxPrice = undefined;
		};
		mostrarContenido();
	});
});