const dynamoDB = require('../dynamodb')
const { handler } = require('./handler')

jest.mock('../dynamodb')

const mockUuid = 'mockUuid'
jest.mock('uuid', () => ({
  v4: () => mockUuid
}))

describe('createCart', () => {
  it('Returns a correct response when successful', async () => {
    expect.assertions(1)
    const event = {}
    const cart = { id: mockUuid, products: [], total: 0 }

    dynamoDB.put = jest.fn(() => ({
      promise: () => ({})
    }))

    const expected = {
      statusCode: 200,
      body: JSON.stringify(cart)
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
    dynamoDB.put = jest.fn(() => ({
      promise: () => { throw new Error('') }
    }))

    const expected = {
      statusCode: mockStatusCode,
      body: JSON.stringify({ message: 'Could not create a cart: {}' })
    }

    try {
      const result = await handler(event)
      expect(result).toEqual(expected)
    } catch (error) {
      expect(error).toEqual(undefined)
    }
  })
})
