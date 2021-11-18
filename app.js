'use strict'
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const request = require('request')
const session = require('express-session')

const router = express.Router()
const app = express()

app.use(session({
    secret: 'superDooperSafe', 
    saveUniinitialized: true, 
    resave: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
    extended: true 
}))

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

let sess

//routes
router.get('/', (req, res) => {
    sess = req.session
    res.render('index', {
        pagename: 'index',
        sess: sess,
    })
})

router.get('/awards', (req, res) => {
    sess = req.session
    res.render('awards', {
        pagename: 'awards',
        sess: sess,
    })
})

router.get('/education', (req, res) => {
    sess = req.session
    res.render('education', {
        pagename: 'education',
        sess: sess,
    })
})

router.get('/experience', (req, res) => {
    sess = req.session
    res.render('experience', {
        pagename: 'experience',
        sess: sess,
    })
})

router.get('/interests', (req, res) => {
    sess = req.session
    res.render('interests', {
        pagename: 'interests',
        sess: sess,
    })
})

router.get('/skills', (req, res) => {
    sess = req.session
    res.render('skills', {
        pagename: 'skills',
        sess: sess,
    })
})

router.get('/profile', (req, res) => {
    sess = req.session
    if(typeof(sess) == 'undefined' || sess.loggedin != true){
        let errors = ['Not an authenticated used.']
        res.render('index', {
            pagename: 'index',
            errs: errors,
        })
    } else {
        res.render('profile', {
            pagename: 'profile',
            sess: sess,
        })
    }
})

router.get('/logout', (req, res) => {
    sess = req.session
    sess.destroy((err) => {
        res.redirect('/')
    })
})

router.post('/login', (req, res) => {
    console.log(req.body)
    let errors = [] ;
    const email = req.body.email.trim()
    const password = req.body.password.trim()
    
    //validate email not blank
    if(email == ''){
        errors.push('Email cannot be blank.')
    }

    //validate password not blank
    if(password == ''){
        errors.push('Password cannot be blank.')
    }

    //email in correct format
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
        errors.push('Email must be in a valid format.')
    }

    //validate password in correct format
    if(!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)){
        errors.push('Password is invalid format.')
    }

    console.log(errors)

    // Render the index page after submission
    //create condition if the email == 'mike@aol.com' and password == 'SuperMario1A!
    if(password == 'SuperMario1A!' && email == 'mike@aol.com'){
        sess = req.session
        sess.loggedin = true
        res.render('profile', {
        pagename: 'profile',
        sess: sess,
    })
    } else {
        errors.push('Invalid User')
        res.render('index', {
        pagename: 'index',
        errs: errors,
    })
    }
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

    //Log out stuff 
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
