#!/usr/bin/env node
const Scan = require('../dynamo/scan')

Scan('Messages').then(messages => {
    console.warn('\n\n______________________')
    console.warn('*      Messages      *\n')
    if (messages.length > 0) {
        messages.forEach(message => {
            console.warn(message)
        })
    }
    else console.warn('No messages found.')
})
