const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const Delete = async (id) => {
    return dynamoDb
        .delete({
            TableName: 'Messages',
            Key: { id }
        })
        .promise()
}

module.exports = Delete
