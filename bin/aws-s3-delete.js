const s3Delete = require('../lib/aws-s3-delete')
const name = process.argv[2]

s3Delete(name).then(console.log, console.error)
