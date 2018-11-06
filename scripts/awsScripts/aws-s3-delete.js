'use strict'
// loading the contents of the .env file
require('dotenv').config()
// instantiating the s3 object to use aws-sdk
const AWS = require('aws-sdk')
const S3 = new AWS.S3()
// s3Delete accepting the fileName and the params
function s3Delete (fileName) {
  const params = {
    // bucket to which the file present
    Bucket: process.env.BUCKET_NAME,
    Key: fileName
  }
  // returning the Promise if reject show console.error
  // if resolve delete the file
  return new Promise(
    function (resolve, reject) {
      S3.deleteObject(params,
        function (err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
    })
}
s3Delete(process.argv[2])
  .then(console.log)
  .catch(console.error)
