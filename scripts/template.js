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
          <button onclick="addToCart(${index})" class="btn-to-basket" aria-label="Produkt in den Warenkorb legen">+</button>
        </article>`;
}

function getCartTemplate(product, index) {
  /*parameters just have same name as product-template parameters, but do not belong to each other*/
  return `<li class="cart-item">
           <h3>${product.name}</h3>

           <div class="cart-item-controls">
             <div>
               <button onclick="quantityOneDown(${index})"
                 class="btn-cart-item-controls"
                 aria-label="Produkt um 1 verringern"
               >
                 −
               </button>
               <span>${product.quantity}</span>
               <button onclick="quantityOneUp(${index})"
                 class="btn-cart-item-controls"
                 aria-label="Produkt um 1 erhöhen"
               >
                 +
               </button>
             </div>
             <p>${formatEUR(product.price * product.quantity)}€</p>
             <button onclick="deleteFromCart(${index})"
               class="btn-delete-item"
               aria-label="Produkt aus Warenkorb löschen"
             >
               <img
                 src="./assets/icons/trash-can-solid.svg"
                 alt="Trash-Can-Symbol"
               />
             </button>
           </div>
        </li>`;
}

function getBillingSummary() {
  return `<li class="billing-row">
              <span>Zwischensumme</span><span>xxx</span>
            </li>
            <li class="billing-row">
              <span>Lieferkosten</span><span>3,50€</span>
            </li>
            <li class="billing-row">
              <span><strong>Gesamt</strong></span
              ><span>xxx</span>
            </li>`;
}
