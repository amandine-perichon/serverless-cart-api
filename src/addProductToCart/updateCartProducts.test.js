const updateCartProducts = require('./updateCartProducts')

describe('updateCartProducts', () => {
  it('adds a product if the cart is empty', () => {
    const productId = 'some-product-id'
    const quantity = 4
    const products = []
    const expected = [{ id: 'some-product-id', quantity }]
    const actual = updateCartProducts(productId, quantity, products)
    expect(actual).toEqual(expected)
  })

  it('adds a product if the cart does not have the product yet', () => {
    const productId = 'some-product-id'
    const quantity = 7
    const anotherProduct = { id: 'another-product-id', quantity: 1 }
    const products = [anotherProduct]
    const expected = [anotherProduct, { id: 'some-product-id', quantity }]
    const actual = updateCartProducts(productId, quantity, products)
    expect(actual).toEqual(expected)
  })

  it('increases the quantity if the product is already in the cart', () => {
    const productId = 'another-product-id'
    const quantity = 7
    const someProduct = { id: productId, quantity: 1 }
    const products = [someProduct]
    const expected = [{ ...someProduct, quantity }]
    const actual = updateCartProducts(productId, quantity, products)
    expect(actual).toEqual(expected)
  })

  it('removes the product if the quantity is 0', () => {
    const productId = 'product-id'
    const quantity = 0
    const someProduct = { id: productId, quantity: 1 }
    const products = [someProduct]
    const expected = []
    const actual = updateCartProducts(productId, quantity, products)
    expect(actual).toEqual(expected)
  })
})
