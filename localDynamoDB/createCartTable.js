const AWS = require('aws-sdk')
const localDynamoDBOptions = require('./options')
const CARTS_TABLE = process.env.CARTS_TABLE || 'serverless-cart-api-carts-dev'

AWS.config.update(localDynamoDBOptions)

const dynamoDB = new AWS.DynamoDB();

(async dynamoDB => {
  const params = {
    'TableName': CARTS_TABLE,
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
    console.log(`Could not create table ${CARTS_TABLE}: ${JSON.stringify(error)}`)
  }
})(dynamoDB)
