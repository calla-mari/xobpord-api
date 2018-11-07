const s3Upload = require('../lib/aws-s3-upload')
const path = process.argv[2]
const ogName = process.argv[3]
const newName = process.argv[4]

s3Upload(path, ogName, newName).then(console.log, console.error)
