const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'serverless-cart-api-products-dev'

const getCartProducts = async (productIds, dynamoDB) => {
  const keys = productIds.map(id => ({ id }))
  try {
    const params = {
      RequestItems: {
        [PRODUCTS_TABLE]: {
          Keys: keys
        }
      }
    }

    // TODO: What if not all products are in the productsDB
    const result = await dynamoDB.batchGet(params).promise()
    return result.Responses[PRODUCTS_TABLE]
  } catch (error) {
    throw error
  }
}

module.exports = getCartProducts
