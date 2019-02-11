const getCart = require('./getCart')

const { cart } = require('./testData.cart.js')

describe('getCart', () => {
  it('returns the cart', async () => {
    const mockDynamoDB = ({
      get: params => ({
        promise: () => Promise.resolve({ Item: cart })
      })
    })

    const actual = await getCart(cart.id, mockDynamoDB)
    const expected = cart
    expect(actual).toEqual(expected)
  })
})
