const { handler: getProductsHandler } = require('./getProducts/handler')
const { handler: createCartHandler } = require('./getProducts/handler')

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
})
