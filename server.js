// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

const os = require('os');
let interfaces = os.networkInterfaces();

const acceptLanguage = require('accept-language');
acceptLanguage.languages(['en-US']);
console.log(acceptLanguage.get('en-GB,en;q=0.8'));

var userAgent = require('user-agent');
let ua = userAgent.parse("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36")

app.get("/api/whoami", function (req, res) {
  let output ={};
  // add the IP
  Object.keys(interfaces).forEach(element => {
    for (let i of interfaces[element]) {
      if (i.internal == false && i.family == "IPv4") output.ipaddress = i.address;
    }  
  // add languages
  output.language = acceptLanguage.get('en-GB,en;q=0.8');
  // add useragent
  output.software = ua.full;

  });
  
  res.json(output);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
