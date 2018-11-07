const multer = require('multer')
const upload = multer({ dest: 'data/uploads/' })
const fs = require('fs')
const express = require('express')
const passport = require('passport')

// use mongoose upload model
const Upload = require('../models/upload')
// intercept errors and send back to client
const handle = require('../../lib/error_handler')
// detect situations in which to throw custom errors
const customErrors = require('../../lib/custom_errors')
// send a 404 for non-existent document
const handle404 = customErrors.handle404
// send a 401 for incorrect owner
const requireOwnership = customErrors.requireOwnership
// require a valid token to be passed with requests
const requireToken = passport.authenticate('bearer', {session: false})

const s3Upload = require('../../lib/aws-s3-upload')
const s3Delete = require('../../lib/aws-s3-delete')

const router = express.Router()

// INDEX
router.get('/uploads', requireToken, (req, res) => {
    // find returns all uploads
    Upload.find()
        // map those uploads into JS Objects
        .then(uploads => uploads.map(upload => upload.toObject()))
        // respond with 200 status and all uploads as JSON
        .then(uploads => res.status(200).json({ uploads: uploads }))
        .catch(err => handle(err, res))
})

// SHOW
router.get('/uploads/:id', requireToken, (req, res) => {
    // find only the requested id
    Upload.findById(req.params.id)
        // 404 error is the requested id does not exist
        .then(handle404)
        // return 200 status and the requested upload as JSON
        .then(upload => res.status(200).json({upload: upload}))
        .catch(err => handle(err, res))
})

// CREATE
router.post('/uploads', [requireToken, upload.single('image')], (req, res) => {
    s3Upload(req.file.path, req.file.originalname, req.body.title)
        .then(response => {
            fs.unlinkSync(req.file.path)
            return response
        })
        .then(response => {
            const params = {
                owner: req.user.id,
                title: response.key,
                url: response.Location,
                tags: req.body.tags
            }
            console.log(params)
            return Upload.create(params)
        })
        .then(upload => res.status(201).json({upload: upload}))
        .catch(err => handle(err, res))
})

// UPDATE
router.patch('./uploads/:id', requireToken, (req, res) => {
    // user should not be able to change owner
    delete req.body.upload.owner
    Upload.findById(req.params.id)
        .then(handle404)
        .then(upload => {
            Object.keys(req.body.upload).forEach(key => req.body.upload[key] === '' ? delete req.body.upload[key] : '')
            return upload.update(req.body.upload)
        })
        .then(() => res.sendStatus(204))
        .catch(err => handle(err, res))
})

// DESTROY
router.delete('/uploads/:id', requireToken, (req, res) => {
    Upload.findById(req.params.id)
        .then(handle404)
        .then(upload => {
            if (req.user.id.localeCompare(upload.owner) === 0) {
                s3Delete(upload.title)
                    .then(() => upload.remove())
                    .then(() => res.sendStatus(204))
                    .catch(err => handle(err, res))
            } else {
                res.sendStatus(403)
            }
        })
        .catch(err => handle(err, res))
})

module.exports = router
