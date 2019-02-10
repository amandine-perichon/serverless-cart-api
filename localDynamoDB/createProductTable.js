const AWS = require('aws-sdk')
const localDynamoDBOptions = require('./options')
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'serverless-cart-api-products-dev'

AWS.config.update(localDynamoDBOptions)

const dynamoDB = new AWS.DynamoDB();

(async dynamoDB => {
  const params = {
    'TableName': PRODUCTS_TABLE,
    'KeySchema': [
      {
        'AttributeName': 'id',
        'KeyType': 'HASH'
      }
    ],
    'AttributeDefinitions': [
      {
        'AttributeName': 'id',
        'AttributeType': 'S'
      }
    ],
    'ProvisionedThroughput': {
      'ReadCapacityUnits': 1,
      'WriteCapacityUnits': 1
    }
  }

  try {
    const result = await dynamoDB.createTable(params).promise()
    console.log(`Table created: ${result.TableDescription.TableName}`)
  } catch (error) {
    console.log(`Could not create table: ${JSON.stringify(error)}`)
  }
})(dynamoDB)
