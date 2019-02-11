const getCartProducts = require('./getCartProducts')

const { cartProducts } = require('./testData.cart.js')
const PRODUCTS_TABLE = 'serverless-cart-api-products-dev'

describe('getCartProducts', () => {
  it('returns the products included in the cart', async () => {
    const mockDynamoDB = ({
      batchGet: params => ({
        promise: () => Promise.resolve({ Responses: { [PRODUCTS_TABLE]: cartProducts } })
      })
    })

    const actual = await getCartProducts(['some-id'], mockDynamoDB)
    const expected = cartProducts
    expect(actual).toEqual(expected)
  })
})
