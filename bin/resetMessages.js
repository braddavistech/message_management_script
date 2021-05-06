#!/usr/bin/env node
const Scan = require('../dynamo/scan')
const Put = require('../dynamo/put')

console.warn("\nResetting messages for all users...\n\n")
const envs = ['dev', 'prod']
Scan('Messages').then(messages => {
    envs.forEach(env => {
        Scan(`User-${env}`).then(users => {
            users.forEach(user => {
                user.messages = messages
                Put(`User-${env}`, user).then(_ => {
                    console.warn(`Successfully updated ${user.first} ${user.last}`)
                })
            })
        })
    })
})
