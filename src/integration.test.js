const { handler: getProductsHandler } = require('./getProducts/handler')

describe('getProducts', () => {
  it('Returns a correct response when successful', async () => {
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
})
