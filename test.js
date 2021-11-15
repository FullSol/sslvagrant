let fs = require('fs')
let http = require('http')
let path = require('path')
let url = require('url')

http.createServer((request, response) => {
    let parseUrl = url.parse(request.url)
    let fileName = path.parse(parseUrl.pathname)
    let file = fileName.name

    if(file == ''){
        file = 'index'
    }

    fs.readFile(file + '.html', 'utf8', (err, body) => {
        if(err){
            response.writeHead(505)
            response.end("Something went wrong.")
        } else {
            response.writeHead(200)
            response.end(body)
        }
    })
}).listen(8080)

