// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

let port = process.env.PORT;
//port = 8080;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:dt", (req, res) => {
  let dt = req.params.dt;
  if (!isNaN(dt)) dt = Number(dt);
  let date = new Date(dt);

  if (date.toString() == 'Invalid Date') {
    res.json({
      error: date.toString()
    });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
