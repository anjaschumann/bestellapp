function renderProducts() {
  let productContainer = document.getElementById("product-display");
  productContainer.innerHTML = "";
  for (let productIndex = 0; productIndex < myProducts.length; productIndex++) {
    productContainer.innerHTML += getProductTemplate(
      myProducts[productIndex],
      productIndex
    );
  }
}

function renderCart() {
  let cartContainer = document.getElementById("cart-display");
  cartContainer.innerHTML = "";
  for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
    cartContainer.innerHTML += getCartTemplate(cart[cartIndex], cartIndex);
  }
}

function renderBillingSummary() {
  const table = document.getElementById("billing-summary");
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 3.5 : 0; //ternary condition; if subtotal > 0 -> shipping 3.5, else -> shippping = 0;
  const total = subtotal + shipping;
  table.innerHTML = getBillingSummary(subtotal, shipping, total);
}

function renderAll() {
  renderCart();
  renderBillingSummary();
  renderProducts();
  updateEmptyCartSpecifics();
  showTotalInBtnPlaceOrder();
  showQuantityInCart();
}

function addToCart(index) {
  // 1. Was ist das Ziel? Produkt aus myProducts holen
  let product = myProducts[index];

  // 2. Welche Daten habe ich vll schon? Im Warenkorb (cart) prüfen, ob schon ein Produkt mit gleichem Namen existiert
  // find() durchsucht das Array und gibt das erste gefundene Objekt zurück,
  // wenn die Bedingung erfüllt ist. Wenn nichts gefunden wird → undefined.
  let itemInCart = cart.find(function (element) {
    //find() returned das ganze Objekt, dessen Namen es gefunden hat
    return element.name === product.name;
    // Vergleich: hat ein Element im cart denselben Namen wie das Produkt aus myProducts?
  });
  //itemInCart ist das Objekt im array cart[]
  // 3. Welche Info kriege ich? Wenn itemInCart NICHT undefined ist → Produkt existiert schon
  if (itemInCart) {
    //itemInCart hat den Wert
    // → quantity (Anzahl) um 1 erhöhen
    itemInCart.quantity++;
  } else {
    // 4. WElche ENtscheidung muss die Funktion treffen? Wenn Produkt noch nicht im Warenkorb ist
    // → neues Objekt ins Array pushen
    cart.push({
      //pusht () setzt immer ans ende, hier muss also kein index übergeben werden
      name: product.name, // Name übernehmen
      price: product.price, // Preis übernehmen
      quantity: 1, // quantity auf 1 setzen (weil gerade erst hinzugefügt)
    });
  }
  // 5. Was passiert nach der Entscheidung? Warenkorb neu rendern (damit die Anzeige aktualisiert wird)
  renderAll();
}

function showQuantityInCart() {
  const quantityRef = document.getElementById("quantity-in-cart");
  let totalAmountOfProductsInCart = 0;
  cart.forEach((element) => {
    totalAmountOfProductsInCart += element.quantity;
  });
  quantityRef.innerText = totalAmountOfProductsInCart;
}

function showTotalInBtnPlaceOrder() {
  const orderBtnRef = document.getElementById("btn-place-order");
  let total = 0;
  cart.forEach((element) => {
    total += element.price * element.quantity;
  });
  if (cart.length > 0) {
    total += 3.5;
    orderBtnRef.innerText = `Bezahlen ${formatEUR(total)}€`;
    orderBtnRef.classList.remove("btn-disabled"); /* changes style of button */
    orderBtnRef.disabled = false; /* disabled is attribute in button tag, does not only change style, but also btn cannot be clicked */
  } else {
    orderBtnRef.innerText = `Bezahlen`;
    orderBtnRef.classList.add("btn-disabled"); /* changes style of button */
    orderBtnRef.disabled = true; /* disabled attribute does not only change style, but makes btn clickable */
  }
}

function quantityOneUp(i) {
  let cartItem = cart[i];
  cartItem.quantity += 1;
  renderAll();
}

function quantityOneDown(i) {
  if (cart[i].quantity > 1) {
    cart[i].quantity -= 1;
  } else {
    cart.splice(i, 1);
  }
  renderAll();
}

const formatEUR = (v) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);

function deleteFromCart(i) {
  cart.splice(i, 1);
  renderAll();
}

//mit forEach ohne arrow funciton
function calculateSubtotal() {
  let subtotal = 0;
  cart.forEach(function (item) {
    // cart.forEach(item => {)
    subtotal += item.price * item.quantity;
  });
  return subtotal;
}

function placeOrder() {
  cart.length = 0;
  renderAll();
  const dialogRef = document.getElementById("dialog-placed-order");
  dialogRef.showModal();
}

function closeDialog() {
  const dialogRef = document.getElementById("dialog-placed-order");
  dialogRef.close();
}

function updateEmptyCartSpecifics() {
  const emptyCartNote = document.getElementById("empty-cart-note");
  emptyCartNote.classList.toggle("visible", cart.length === 0);
}

function toggleCart() {
  const cartBtnRef = document.getElementById("cart");
  cartBtnRef.classList.toggle("is-open");
}

//according to placeOrder() with showModal( )
function openRespCartDialog() {
  const respCartRef = document.getElementById("resp-cart-dialog");
  respCartRef.showModal();
}
