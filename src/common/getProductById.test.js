const getProductById = require('./getProductById')

const { cartProducts } = require('./testData.cart.js')

describe('getProductById', () => {
  it('returns the cart', async () => {
    const product = cartProducts[0]
    const mockDynamoDB = ({
      get: params => ({
        promise: () => Promise.resolve({ Item: product })
      })
    })

    const actual = await getProductById(product.id, mockDynamoDB)
    const expected = product
    expect(actual).toEqual(expected)
  })
})
