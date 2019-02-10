const AWS = require('aws-sdk')
const localDynamoDBOptions = require('../localDynamoDB/options')

let options = {}

if (process.env.IS_OFFLINE) {
  options = localDynamoDBOptions
}

const client = new AWS.DynamoDB.DocumentClient(options)

module.exports = client
