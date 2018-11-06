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
router.post('/uploads', requireToken, (req, res) => {
    console.log(req.body)
    // set owner to current user
    req.body.upload.owner = req.user.id
    // create using the request body
    Upload.create(req.body.upload)
        // first callback defines sending the client a 201 status code and an upload object as JSON
        // second callback defined handling an error
        .then(upload => res.status(201).json({ upload: upload.toObject()}), err => handle(err, res))
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
        .then(upload => upload.remove())
        .then(() => res.sendStatus(204))
        .catch(err => handle(err, res))
})

module.exports = router