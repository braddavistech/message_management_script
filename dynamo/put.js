const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const Put = (table, newItem) => {
    return dynamoDb
        .put({
            TableName: `${table}`,
            Item: newItem
        })
        .promise()
}

module.exports = Put
