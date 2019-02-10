const dynamoDB = require('../dynamodb')
const { handler } = require('./handler')

jest.mock('../dynamodb')

describe('getProducts', () => {
  it('Returns a correct response when successful', async () => {
    expect.assertions(1)
    const event = {}
    const products = [{
      id: 'axe-id',
      price: 20,
      name: 'Axe'
    }]

    dynamoDB.scan = jest.fn(() => ({
      promise: () => ({ Items: products })
    }))

    const expected = {
      statusCode: 200,
      body: JSON.stringify(products)
    }

    try {
      const actual = await handler(event)
      expect(actual).toEqual(expected)
    } catch (error) {
      console.log(error)
      expect(error).toEqual(undefined)
    }
  })

  it('Returns a correct response when the dynamo call fails', async () => {
    expect.assertions(1)
    const event = {}

    const mockStatusCode = 500
    dynamoDB.scan = jest.fn(() => ({
      promise: () => { throw new Error('') }
    }))

    const expected = {
      statusCode: mockStatusCode,
      body: JSON.stringify({ message: 'Could not get the products: {}' })
    }

    try {
      const result = await handler(event)
      expect(result).toEqual(expected)
    } catch (error) {
      expect(error).toEqual(undefined)
    }
  })
})
