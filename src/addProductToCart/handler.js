const dynamoDB = require('../dynamodb')
const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

module.exports.handler = async (event, context) => {
  const {
    pathParameters: { cartId, productId }
  } = event

  try {
    const { Item: cart } = await getCart(cartId, dynamoDB)

    if (!cart) {
      return {
        statusCode: 404,
        body: JSON.stringify(`Could not find cart ${cartId}`)
      }
    }

    const productInCart = getProductInCart(productId, cart.products)
    const updatedProducts = productInCart
      ? cart.products : [...cart.products, { id: productId, quantity: 1 }]

    // TODO: Should check that the product exists in the products table
    const { Attributes: updatedCart } = await updateCart(cartId, updatedProducts, dynamoDB)
    return {
      statusCode: 200,
      body: JSON.stringify(updatedCart)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: `Could not update cart ${cartId} with product ${productId}: ${JSON.stringify(error)}`
      })
    }
  }
}
const getCart = (cartId, dynamoDB) => {
  const params = {
    TableName: process.env.CARTS_TABLE,
    Key: {
      id: cartId
    }
  }
  return dynamoDB.get(params).promise()
}

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

const getProductInCart = (productId, products) => products.find(product => product.id === productId)
