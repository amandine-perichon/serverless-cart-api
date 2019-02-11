const uuid = require('uuid')
const dynamoDB = require('../dynamodb')
const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

module.exports.handler = async (event, context) => {
  const item = {
    id: uuid.v4(),
    products: []
  }
  const params = {
    TableName: CARTS_TABLE,
    Item: item
  }

  try {
    await dynamoDB.put(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(item)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: `Could not create a cart: ${JSON.stringify(error)}`
      })
    }
  }
}
