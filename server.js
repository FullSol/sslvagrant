//Set up some constants

const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

//Create the server
http.createServer((req, res) => {
    
    //Set up variable for dynamic urls
    let parsed = url.parse(req.url)
    let filename = path.parse(parsed.pathname)

    let name = filename.name == '' ? 'index' : filename.name
    let ext = filename.ext == '' ? '.html' : filename.ext
    let dir = filename.dir == '/' ? '' : filename.dir + '/'
    let page = filename.name == '' ? 'index.html' : filename.name

    let f = (dir + name + ext).replace('/', '')

    console.log(f)

    //mimeTypes
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/js',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    }
    console.log(mimeTypes[ext])
    if(f){
        fs.readFile(f, (err, data) => {
            if(page) {
                if(mimeTypes.hasOwnProperty(ext)){
                    res.writeHead(200, {
                        'Content-Tpe': mimeTypes[ext]                   
                    })
                     if(ext == '.html'){
                         res.write('<script>var page = "' + page + '</script>')
                    }
                    res.end(data, 'utf8')
                }
            }
        })
    }
}).listen('8080', () =>{
    console.log('info', 'Server is on port:' + 8080)
})