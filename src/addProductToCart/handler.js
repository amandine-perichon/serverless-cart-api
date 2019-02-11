const dynamoDB = require('../dynamodb')
const getCartById = require('../common/getCartById')
const getProductById = require('../common/getProductById')
const getCartProducts = require('../common/getCartProducts')
const { formatCart } = require('../common/formatCart')
const updateCartProducts = require('./updateCartProducts')
const updateCart = require('./updateCart')

module.exports.handler = async (event, context) => {
  const {
    pathParameters: { cartId, productId },
    body
  } = event

  if (!body || !JSON.parse(body).hasOwnProperty('quantity')) {
    return {
      statusCode: 400,
      body: JSON.stringify(`Missing quantity in body`)
    }
  }

  const quantity = JSON.parse(body).quantity

  try {
    const cart = await getCartById(cartId, dynamoDB)

    if (!cart) {
      return {
        statusCode: 404,
        body: JSON.stringify(`Could not find cart ${cartId}`)
      }
    }

    const product = await getProductById(productId, dynamoDB)

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify(`Could not find product ${productId}`)
      }
    }

    const cartProducts = updateCartProducts(productId, quantity, cart.products)
    const { Attributes: updatedCart } = await updateCart(cartId, cartProducts, dynamoDB)

    const { products = [] } = updatedCart
    const productIds = products.map(product => product.id)

    const cartProductInfo = await getCartProducts(productIds, dynamoDB)
    const formattedCart = formatCart(updatedCart, cartProductInfo)

    return {
      statusCode: 200,
      body: JSON.stringify(formattedCart)
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
