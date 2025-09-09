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
  renderProducts();
  showQuantityInCart();
  showQuantityInRespCart();
  let cartContainer = document.getElementById("cart-container");
  let dialogRespCart = document.getElementById("dialog-resp-cart");
  if (cartContainer.innerHTML != "" || dialogRespCart.innerHTML != "") {
    renderCart();
    renderBillingSummary();
    updateEmptyCartSpecifics();
    showTotalInBtnPlaceOrder();
  }
}

//function takes one parameter (index: the position of product inside myProducts)
function addToCart(index) {
  let product = myProducts[index]; //gets product at position index from myProduct[] and stores it in variable product
  // find() searches array for existing entry that matches this product; find() returns first matching element or undefined if none is found
  let itemInCart = cart.find(function (element) {
    //search condition: a cart entry is considered a match, if its name matches exactly the product.name
    return element.name === product.name;
  });
  //checks whether a matching entry was found (truthy → it exists). itemInCart=true
  if (itemInCart) {
    // if yes: increase the quantity of that cart item by 1
    itemInCart.quantity++;
  } else {
    //if not (item is not found in cart)
    cart.push({
      //pusht () adds new object to cart with:
      name: product.name, // pass name
      price: product.price, // pass price
      quantity: 1, // set quantity to 1, because first item passed
    }); //no index needs to be set/transferred
  }
  // rendering to update cart information
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

function renderCartDesktop() {
  let container = document.getElementById("cart-container");
  if (container.innerHTML === "") {
    container.innerHTML = getAside();
    renderCart();
    renderBillingSummary();
    updateEmptyCartSpecifics();
    showTotalInBtnPlaceOrder();
  } else {
    container.innerHTML = "";
  }
}

function renderRespCart() {
  let container = document.getElementById("cart-container");
  let dialogRespCart = document.getElementById("dialog-resp-cart");
  container = container.innerHTML = "";
  dialogRespCart.showModal();
  dialogRespCart.innerHTML =
    `<button onclick="closeDialogRespCart()" class="btn-close-resp-cart">x</button>` +
    getAside();
  renderCart();
  renderBillingSummary();
  updateEmptyCartSpecifics();
  showTotalInBtnPlaceOrder();
}

function closeDialogRespCart() {
  console.log("help");
  let dialogRespCartRef = document.getElementById("dialog-resp-cart");
  dialogRespCartRef.close();
}

function showQuantityInRespCart() {
  const quantityRef = document.getElementById("quantity-in-resp-cart");
  let totalAmountOfProductsInCart = 0;
  cart.forEach((element) => {
    totalAmountOfProductsInCart += element.quantity;
  });
  quantityRef.innerText = totalAmountOfProductsInCart;
}
