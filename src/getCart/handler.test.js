const { handler } = require('./handler')
const getCartById = require('../common/getCartById')
const getCartProducts = require('./getCartProducts')

const { cart, cartProducts, formattedCart } = require('./testData.cart.js')
const mockCart = cart
const mockCartProducts = cartProducts
jest.mock('../common/getCartById', () => jest.fn(() => mockCart))
jest.mock('./getCartProducts', () => jest.fn(() => mockCartProducts))

describe('getCart handler', () => {
  it('formats the cart correctly', async () => {
    const event = { pathParameters: { cartId: cart.id } }
    const actual = await handler(event)
    const expected = {
      statusCode: 200,
      body: JSON.stringify(formattedCart)
    }
    expect(getCartById).toHaveBeenCalled()
    expect(getCartProducts).toHaveBeenCalled()
    expect(actual).toEqual(expected)
  })
})
