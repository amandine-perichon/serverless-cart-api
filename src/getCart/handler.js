const dynamoDB = require('../dynamodb')
const getCart = require('./getCart')
const getCartProducts = require('./getCartProducts')
const { formatCart } = require('./formatCart')

module.exports.handler = async (event, context) => {
  const {
    pathParameters: { cartId }
  } = event

  try {
    const cart = await getCart(cartId, dynamoDB)
    const { products = [] } = cart
    const productIds = products.map(product => product.id)

    const cartProducts = await getCartProducts(productIds, dynamoDB)
    const formattedCart = formatCart(cart, cartProducts)

    return {
      statusCode: 200,
      body: JSON.stringify(formattedCart)
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: `Could not get cart ${cartId}: ${JSON.stringify(error)}`
      })
    }
  }
}
