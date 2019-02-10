const dynamoDB = require('../dynamodb')
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'serverless-cart-api-products-dev'

module.exports.handler = async (event, context) => {
  const params = {
    TableName: PRODUCTS_TABLE
  }

  try {
    const result = await dynamoDB.scan(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: `Could not get the products: ${JSON.stringify(error)}`
      })
    }
  }
}
