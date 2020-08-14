const express = require('express')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const uploadsRoutes = require('./routes/Upload')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({createParentPath: true}))
app.use('/media', express.static(path.join(__dirname, 'uploads')))

app.use('/uploads', uploadsRoutes)

module.exports = app