const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

const getCart = async (cartId, dynamoDB) => {
  try {
    const params = {
      TableName: CARTS_TABLE,
      Key: {
        id: cartId
      }
    }

    const result = await dynamoDB.get(params).promise()
    return result.Item
  } catch (error) {
    throw error
  }
}

module.exports = getCart
