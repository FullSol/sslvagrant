let http = require('http');
let myname = function(){
  return "Here is my IP address";
}
async function callHttpbin() {
  let promise = new Promise((resolve, reject) => {
        http.get(
            'http://httpbin.org/ip',
            function(response) {
                let str="";
                response.setEncoding('utf8');
                response.on('data', function(data){
                    str += data;
                });
                response.on('end', function() {
                    var result = JSON.parse(str);
                    myips = result.origin;
                    resolve(myips)
                });
            }
        );
    });

    let result = await promise
    let valueA = result
    let valueB = myname()
    console.log(valueB+" "+valueA + ', ' + valueA)
    // Output Here is my IP address 149.24.160.1, 149.24.160.1
}

callHttpbin()