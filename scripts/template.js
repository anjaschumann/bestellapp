function getProductTemplate(product) {
  return `<article class="single-product-display">
          <img src="${product.img}" alt="" />
          <div class="single-product-info">
            <h3>${product.name}</h3>
            <p class="description">
              ${product.description}
            </p>
            <p class="price">${product.price.toFixed(2)}€</p>
          </div>
          <button class="btn-to-basket">+</button>
        </article>`;
}
