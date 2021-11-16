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
    let errors = [] ;
    
    //validate email not blank
    if(req.body.email.trim() == ''){
        errors.push('Email cannot be blank.')
    }

    //validate password not blank
    if(req.body.password.trim() == ''){
        errors.push('Password cannot be blank.')
    }

    //email in correct format
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email.trim())){
        errors.push('Email must be in a valid format.')
    }

    //validate password in correct format
    if(!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(req.body.password)){
        errors.push('Password is invalid format.')
    }

    console.log(errors)

    // Render the index page after submission
    res.render('index', {
        pagename: 'index', 
        errs: errors,
    })
})

router.post('/register', (req, res) => {
    console.log(req.body)
    let errors = [];

    //validate email not blank
    if(req.body.email.trim() == ''){
        errors.push('Email cannot be blank.')
    }

    //validate first name is not blank
    if(req.body.fname.trim() == ''){
        errors.push('First name cannot be  blank.')
    }

    //validate first name
    if(!/^[a-z ,.'-]+$/i.test(req.body.fname)){
        errors.push('Please enter a valid first name - no numbers.')
    }

    //validate last name is not blank
    if(req.body.lname.trim() == ''){
        errors.push('Last name cannot be blank.')
    }

    //validate last name
      if(!/^[a-z ,.'-]+$/i.test(req.body.lname)){
        errors.push('Please enter a valid last name - no numbers.')
    }

    //validate password not blank
    if(req.body.password.trim() == ''){
        errors.push('Password cannot be blank.')
    }

    //validate address is not blank
    if(req.body.address.trim() == ''){
        errors.push('Please enter an address.')
    }

    //validate postal code is not blank
    if(req.body.postal.trim() == ''){
        errors.push('Please enter a zip code')
    }

    //validate the zip code
    if(!/\b\d{5}\b/g.test(req.body.postal.trim())){
        errors.push('Please enter a 5 digit zip code.')
    }

    //email in correct format
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email.trim())){
        errors.push('Email must be in a valid format.')
    }

    //validate password in correct format
    if(!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(req.body.password)){
        errors.push('Password is invalid format.')
    }

    if(!req.body.consent == 'undefined'){
       errors.push('Please provide consent to move forward.')
    }

    console.log(req.body.consent)

    // Render the index page after submission
    res.render('index', {
        pagename: 'index', 
        errs: errors,
    })

})

//declare any static file location
app.use(express.static('views/'));
app.use(express.static('public'));
app.use('/', router)

//start Server
const server = app.listen('8080', () =>{
    console.log('Server Running on Port 8080');
})
