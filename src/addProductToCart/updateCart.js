const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

const updateCart = (cartId, products, dynamoDB) => {
  const params = {
    TableName: CARTS_TABLE,
    Key: {
      id: cartId
    },
    ExpressionAttributeNames: {
      '#products': 'products'
    },
    ExpressionAttributeValues: {
      ':products': products
    },
    UpdateExpression: 'SET #products = :products',
    ReturnValues: 'ALL_NEW'
  }

  return dynamoDB.update(params).promise()
}

module.exports = updateCart
