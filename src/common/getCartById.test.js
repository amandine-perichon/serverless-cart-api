const getCartById = require('./getCartById')

const { cart } = require('./testData.cart.js')

describe('getCartById', () => {
  it('returns the cart', async () => {
    const mockDynamoDB = ({
      get: params => ({
        promise: () => Promise.resolve({ Item: cart })
      })
    })

    const actual = await getCartById(cart.id, mockDynamoDB)
    const expected = cart
    expect(actual).toEqual(expected)
  })
})
