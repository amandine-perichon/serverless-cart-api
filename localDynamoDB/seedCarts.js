const AWS = require('aws-sdk')
const localDynamoDBOptions = require('./options')
const carts = require('./carts.json')
const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

AWS.config.update(localDynamoDBOptions)

const docClient = new AWS.DynamoDB.DocumentClient()

try {
  carts.forEach(async cart => {
    const params = {
      'TableName': CARTS_TABLE,
      Item: {
        'id': cart.id,
        'products': cart.products
      }
    }
    await docClient.put(params).promise()
    console.log(`Cart ${cart.id} added to table ${CARTS_TABLE}`)
  })
} catch (error) {
  console.log(`Could not seed table ${CARTS_TABLE} ${JSON.stringify(error)}`)
}
