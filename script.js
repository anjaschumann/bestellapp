//Gerichte anzeigen lassen (render)
//template erstellen
//add to basket
//saveToLocalStorage

function renderProducts() {
  let productContainer = document.getElementById("product-display");
  productContainer.innerHTML = "";
  for (productIndex = 0; productIndex < myProducts.length; productIndex++) {
    let singleProduct = myProducts[productIndex];
    productContainer.innerHTML += getProductTemplate(singleProduct); //singleProduct wird kopiert/referenziert und in die Parameter-Variable (product) eingesetzt
  }
}

renderProducts();
