const formatCart = (cart, cartProducts) => {
  const productsWithQuantity = getProductsWithQuantity(cart, cartProducts)
  const productsWithTotals = getProductsWithTotals(productsWithQuantity)

  return {
    ...cart,
    products: productsWithTotals,
    total: getCartTotal(productsWithTotals)
  }
}

const getProductsWithQuantity = (cart, cartProducts) => {
  const productQuantities = cart.products.reduce((acc, product) => {
    return {
      ...acc,
      [product.id]: product.quantity
    }
  }, {})
  return cartProducts.map(product => ({ ...product, quantity: productQuantities[product.id] }))
}

const getProductsWithTotals = products => products.map(product => {
  const total = toTwoDecimals(product.price * product.quantity)
  return {
    ...product,
    total
  }
})

const getCartTotal = products => {
  const total = products.reduce((total, product) => {
    return total + product.total
  }, 0)

  return toTwoDecimals(total)
}

const toTwoDecimals = x => Number(Number.parseFloat(x).toFixed(2))

module.exports = { formatCart, getProductsWithQuantity, getProductsWithTotals, getCartTotal }
