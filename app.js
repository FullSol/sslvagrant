'use strict'
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const request = require('request')

const router = express.Router()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
    extended: true 
}))

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

//routes
router.get('/', (req, res) => {
    res.render('index', {
        pagename: 'index'
    })
})

router.get('/awards', (req, res) => {
    res.render('awards', {
        pagename: 'awards'
    })
})

router.get('/education', (req, res) => {
    res.render('education', {
        pagename: 'education'
    })
})

router.get('/experience', (req, res) => {
    res.render('experience', {
        pagename: 'experience'
    })
})

router.get('/interests', (req, res) => {
    res.render('interests', {
        pagename: 'interests'
    })
})

router.get('/skills', (req, res) => {
    res.render('skills', {
        pagename: 'skills'
    })
})

router.post('/login', (req, res) => {
    console.log(req.body)
})

//declare any static file location
app.use(express.static('views/'));
app.use(express.static('public'));
app.use('/', router)

//start Server
const server = app.listen('8080', () =>{
    console.log('Server Running on Port 8080');
})
