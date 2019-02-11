const cartProducts = [{
  'id': 'c9b9a282-5fab-49c3-85a2-b47440193744',
  'name': 'Sledgehammer',
  'price': 125.76
},
{
  'id': '5e691e38-b2c9-4ecc-93f9-083c186a6142',
  'name': 'Axe',
  'price': 190.51
}]

const cart = {
  'id': '614db0ad-e62d-44a0-833b-44f1d1df3946',
  'products': [
    {
      'id': 'c9b9a282-5fab-49c3-85a2-b47440193744',
      'quantity': 3
    },
    {
      'id': '5e691e38-b2c9-4ecc-93f9-083c186a6142',
      'quantity': 2
    }
  ]
}

const productsWithQuantity = [{
  'id': 'c9b9a282-5fab-49c3-85a2-b47440193744',
  'name': 'Sledgehammer',
  'price': 125.76,
  'quantity': 3
},
{
  'id': '5e691e38-b2c9-4ecc-93f9-083c186a6142',
  'name': 'Axe',
  'price': 190.51,
  'quantity': 2
}]

const productsWithTotals = [{
  'id': 'c9b9a282-5fab-49c3-85a2-b47440193744',
  'name': 'Sledgehammer',
  'price': 125.76,
  'quantity': 3,
  total: 377.28
},
{
  'id': '5e691e38-b2c9-4ecc-93f9-083c186a6142',
  'name': 'Axe',
  'price': 190.51,
  'quantity': 2,
  total: 381.02
}]

const cartTotal = 758.3

const formattedCart = { ...cart, products: productsWithTotals, total: cartTotal }

module.exports = { cart, cartProducts, productsWithQuantity, productsWithTotals, cartTotal, formattedCart }
