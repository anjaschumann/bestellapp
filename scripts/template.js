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
          <button onclick="addToCart(${index})" class="btn-to-basket" aria-label="Produkt in den Warenkorb legen" type="button">+</button>
        </article>`;
}

function getCartTemplate(product, index) {
  return `<li class="cart-item">
           <h3>${product.name}</h3>

           <div class="cart-item-controls">
             <div>
               <button onclick="quantityOneDown(${index})"
                 class="btn-cart-item-controls"
                 aria-label="Produkt um 1 verringern" type="button"
               >
                 −
               </button>
               <span>${product.quantity}</span>
               <button onclick="quantityOneUp(${index})"
                 class="btn-cart-item-controls"
                 aria-label="Produkt um 1 erhöhen" type="button"
               >
                 +
               </button>
             </div>
             <p>${formatEUR(product.price * product.quantity)}€</p>
             <button onclick="deleteFromCart(${index})"
               class="btn-delete-item"
               aria-label="Produkt aus Warenkorb löschen" type="button"
             >
               <img
                 src="./assets/icons/trash-can-solid.svg"
                 alt="Trash-Can-Symbol"
               />
             </button>
           </div>
        </li>`;
}

function getBillingSummary(subtotal, delivery, total) {
  return `<li class="billing-row">
              <span>Zwischensumme</span><span>${formatEUR(subtotal)}€</span>
            </li>
            <li class="billing-row">
              <span>Lieferkosten</span><span>${formatEUR(delivery)}€</span>
            </li>
            <li class="billing-row total">
              <span><strong>Gesamt</strong></span
              ><span>${formatEUR(total)}€</span>
            </li>`;
}

function getAside() {
  return `<aside class="cart" id="cart">
          <h2>Warenkorb</h2>
          <div id="empty-cart-note" class="empty-cart-note">
            <h3>Dein Warenkorb ist leer.</h3>
            <p>Wähle Produkte aus dem Shop und füge sie hinzu.</p>
          </div>
          <ul class="cart-display cart-scroll" id="cart-display">
            <!-- template for cart-item -->
          </ul>
          <ul class="billing-summary" id="billing-summary">
            <!-- template for billing-summary -->
          </ul>
          <button
            id="btn-place-order"
            onclick="placeOrder()"
            class="btn-place-order"
          >
            Bestellen
          </button>
        </aside>`;
}
