function getProductTemplate(product, index) {
  return `<article class="single-product-display">
          <img src="${product.img}" alt="" />
          <div class="single-product-info">
            <h3>${product.name}</h3>
            <p class="description">
              ${product.description}
            </p>
            <p class="price">${product.price.toFixed(2)}€</p>
          </div>
          <button onclick="moveToCart(${index})" class="btn-to-basket" aria-label="Produkt in den Warenkorb legen">+</button>
        </article>`;
}

function renderCart(productInCart) {
  return;
}
