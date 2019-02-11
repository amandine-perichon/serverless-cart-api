const dynamoDB = require('../dynamodb')
const getCartById = require('../common/getCartById')
const getCartProducts = require('../common/getCartProducts')
const { formatCart } = require('../common/formatCart')

module.exports.handler = async (event, context) => {
  const {
    pathParameters: { cartId }
  } = event

  try {
    const cart = await getCartById(cartId, dynamoDB)
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
