const AWS = require('aws-sdk')
const localDynamoDBOptions = require('./options')
const products = require('./products.json')
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'serverless-cart-api-products-dev'

AWS.config.update(localDynamoDBOptions)

const docClient = new AWS.DynamoDB.DocumentClient()

try {
  products.forEach(async product => {
    const params = {
      'TableName': PRODUCTS_TABLE,
      Item: {
        'id': product.id,
        'name': product.name,
        'price': product.price
      }
    }
    await docClient.put(params).promise()
    console.log(`Product ${product.name} added to table ${PRODUCTS_TABLE}`)
  })
} catch (error) {
  console.log(`Could not seed table ${PRODUCTS_TABLE} ${JSON.stringify(error)}`)
}
