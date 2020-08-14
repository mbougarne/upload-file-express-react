const Router = require('express').Router()
const mime = require('mime')
const randomNumber = require('../helpers/randomNumber')
const fetchFiles = require('../helpers/getFiles')

const UPLOADS_PATH = process.env.UPLOADS

Router.get('/', (req, res) =>  fetchFiles(res))

Router.get('/:filename', (req, res) => {

})

Router.post('/', (req, res) => {

    if(!req.files) {
        return res.status(412).json({
            success: false,
            error_code: 412,
            message: 'There is no file on the request'
        })
    }

    let uploadedFile = req.files.document
    let uploadedName = randomNumber() + '.' + mime.getExtension(uploadedFile.mimetype)
    
    uploadedFile.mv(UPLOADS_PATH + uploadedName)
    console.log(req.body)
    return res.status(201).json({
        success: true,
        file_path: UPLOADS_PATH + uploadedName,
        message: 'File has been uploaded!'
    })
})

module.exports = Router

