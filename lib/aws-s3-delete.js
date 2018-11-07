'use strict'

// load config from .env file
require('dotenv').config()
// use Amazon's Express AWS SDK
const AWS = require('aws-sdk')

// instantiate S3 object
const S3 = new AWS.S3()

function s3Delete(fileName) {
    // params defined by the aws-sdk
    const params = {
        // bucket to which the file should be deleted from, defined in .env
        Bucket: process.env.BUCKET_NAME,
        // name of the file in S3
        Key: fileName
    }

    // Promisify S3.deleteObject
    return new Promise((resolve, reject) => {
        // pass the sdk our params and a callback to handle errors and amazon's return data
        S3.deleteObject(params, (err, data) => {
            if (err) {
                // reject on error
                reject(err)
            } else {
                // resolve if no error, passing on the data returned from Amazon
                resolve(data)
            }
        })
    })
}
module.exports = s3Delete