const express= require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended : true}));

router.get('/', (req, res) => {
   
    res.send('Hello there.')
})

router.get("/form", (req,res) => {
const html = '<form name="login" action="awsdata" method="POST">' +
                '<input type="text" name="email" placeholder="Email" />' +
                '<input type="password" name="password" placeholder="Password" />' +
                '<button type="submit">Submit</button>' +
            '</form>'
    res.send(html);
})



router.post("/awsdata",function(req,res){
    
    const email = req.body.email.trim();
    const password = req.body.password;

    request("https://ly6fsx95ld.execute-api.us-east-2.amazonaws.com/production?email=" + email + "&password=" + password,{
            json:true
        },
        (err,response,body) => {
            if(err){return console.log(err)};

            if(body.Count > 0){ 
                res.send(JSON.stringify(body))
            } else { 
                res.send('Invalid User')
            }
    })
})
app.use("/",router);
app.listen("8080");