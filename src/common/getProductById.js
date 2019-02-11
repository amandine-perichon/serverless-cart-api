const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'serverless-cart-api-products-dev'

const getProductById = async (productId, dynamoDB) => {
  try {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: {
        id: productId
      }
    }

    const result = await dynamoDB.get(params).promise()
    return result.Item
  } catch (error) {
    throw error
  }
}

module.exports = getProductById
