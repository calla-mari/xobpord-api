/* eslint-disable indent */
'use strict'

// load config from .env file
require('dotenv').config()
// use Amazon's Express AWS SDK
const AWS = require('aws-sdk')
// use filestream to send the data to S3
const fs = require('fs')
// use mime to find the correct data types and extensions
const mime = require('mime-types')

// instantiate S3 object
const S3 = new AWS.S3()

function s3Upload(filePath, ogName, fileName) {
    // create stream from the given file
    const stream = fs.createReadStream(filePath)
    // file type of the given file
    const contentType = mime.lookup(ogName)
    // extension of the given file
    const ext = mime.extension(contentType)
    // params defined by the aws-sdk
    const params = {
        // allows the file to be read/downloaded by anyone possessing the link
        ACL: 'public-read',
        // bucket to which the file should be uploaded, defined in .env
        Bucket: process.env.BUCKET_NAME,
        // name of the file in S3
        Key: `${fileName}.${ext}`,
        // content of the upload
        Body: stream,
        // file type of the file, so S3 knows how to handle the file
        ContentType: contentType
    }

    // Promisify S3.upload
    return new Promise((resolve, reject) => {
        // pass the sdk our params and a callback to handle errors and amazon's return data
        S3.upload(params, (err, data) => {
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
module.exports = s3Upload
