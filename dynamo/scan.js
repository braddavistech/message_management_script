const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const Scan = async table => {
    const Items = []
    let lastKey = 'firstRun'
    while (lastKey) {
        const params = {
            TableName: table
        }
        if (lastKey !== 'firstRun') params.ExclusiveStartKey = lastKey
        const db = await dynamoDb.scan(params).promise()
        lastKey = db.LastEvaluatedKey || undefined
        Items.push(...db.Items)
    }
    return Items
}

module.exports = Scan
