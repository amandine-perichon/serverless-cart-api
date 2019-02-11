const { formatCart, getProductsWithQuantity, getProductsWithTotals, getCartTotal } = require('./formatCart')
const { cart, cartProducts, productsWithQuantity, productsWithTotals, cartTotal, formattedCart } = require('./testData.cart.js')

describe('getProductsWithQuantities', () => {
  it('return the products with quantity', () => {
    const actual = getProductsWithQuantity(cart, cartProducts)
    const expected = productsWithQuantity
    expect(actual).toEqual(expected)
  })
})

describe('getProductWithTotals', () => {
  it('return the products with total', () => {
    const actual = getProductsWithTotals(productsWithQuantity)
    const expected = productsWithTotals
    expect(actual).toEqual(expected)
  })
})

describe('getCartTotal', () => {
  it('returns cart total', () => {
    const actual = getCartTotal(productsWithTotals)
    const expected = cartTotal
    expect(actual).toEqual(expected)
  })
})

describe('formatCart', () => {
  it('returns the name, price and id of all products', () => {
    const actual = formatCart(cart, cartProducts)
    expect(actual.products[0]).toHaveProperty('name')
    expect(actual.products[0]).toHaveProperty('price')
    expect(actual.products[0]).toHaveProperty('id')
  })

  it('returns quantity for each product', () => {
    const actual = formatCart(cart, cartProducts)
    expect(actual.products[0]).toHaveProperty('quantity')
  })

  it('returns total for each product', () => {
    const actual = formatCart(cart, cartProducts)
    expect(actual.products[0]).toHaveProperty('total')
  })

  it('returns the correct cart', () => {
    const actual = formatCart(cart, cartProducts)
    const expected = formattedCart
    expect(actual).toEqual(expected)
  })
})
