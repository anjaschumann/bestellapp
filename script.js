//Gerichte anzeigen lassen (render)
//template erstellen
//add to basket
//saveToLocalStorage

function renderProducts() {
  let productContainer = document.getElementById("product-display");
  productContainer.innerHTML = "";
  for (productIndex = 0; productIndex < myProducts.length; productIndex++) {
    productContainer.innerHTML += getProductTemplate(
      myProducts[productIndex],
      productIndex
    );
  }
}
renderProducts();

function addToCart(index) {
  let productName = myProducts[index].name;
  cart.push(productName);

  renderCart();
}
