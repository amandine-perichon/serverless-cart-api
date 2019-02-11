const { handler: getProductsHandler } = require('./getProducts/handler')
const { handler: createCartHandler } = require('./getProducts/handler')
const { handler: getCartHandler } = require('./getCart/handler')

describe('Service', () => {
  it('Returns all products', async () => {
    expect.assertions(2)
    const event = {}

    try {
      const actual = await getProductsHandler(event)
      expect(actual.statusCode).toEqual(200)
      expect(typeof JSON.parse(actual.body)).toEqual('object')
    } catch (error) {
      console.log(error)
      expect(error).toEqual(undefined)
    }
  })

  it('Creates a cart', async () => {
    expect.assertions(2)
    const event = {}

    try {
      const actual = await createCartHandler(event)
      expect(actual.statusCode).toEqual(200)
      expect(typeof JSON.parse(actual.body)).toEqual('object')
    } catch (error) {
      console.log(error)
      expect(error).toEqual(undefined)
    }
  })

  it('Gets a cart', async () => {
    expect.assertions(2)
    const cartId = '614db0ad-e62d-44a0-833b-44f1d1df3946'
    const event = { pathParameters: { cartId } }

    try {
      const actual = await getCartHandler(event)
      expect(actual.statusCode).toEqual(200)
      expect(typeof JSON.parse(actual.body)).toEqual('object')
    } catch (error) {
      console.log(error)
      expect(error).toEqual(undefined)
    }
  })
})
