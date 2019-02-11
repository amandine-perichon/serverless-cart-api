
const updateCartProducts = (productId, quantity, products) => {
  if (cartHasProduct(productId, products)) {
    return changeProductQuantity(productId, quantity, products)
  } else {
    return addProduct(productId, quantity, products)
  }
}

const changeProductQuantity = (productId, quantity, products) => {
  if (quantity === 0) {
    return products.filter(product => product.id !== productId)
  }

  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      return {
        ...product,
        quantity
      }
    }
    return product
  })
  return updatedProducts
}

const addProduct = (productId, quantity, products) => {
  return [
    ...products,
    { id: productId, quantity }
  ]
}

const cartHasProduct = (productId, products) => products.find(product => product.id === productId)

module.exports = updateCartProducts
