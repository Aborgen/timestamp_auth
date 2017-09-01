// Dependencies
const express          = require('express'),
      path             = require('path'),
      bodyParser       = require('body-parser'),
      router           = express.Router(),

      scripts          = require('./scripts'),

// Server setup
      app              = express(),
      port             = 3000;

// Initialize express
app.enable('trust proxy');

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser Middleware setup
app.use(bodyParser.json());

// Home
app.get('/', (req, res) => {
    res.send("WELCOME");
});

// Get UIC and 'natural' time located in :arg
app.get('/convert/:arg', (req, res) => {
    console.log(req.path);
    const hurm = scripts.parseArgument(req.path.substr(1));
    console.log(hurm);
    res.json(hurm);
});

// Get user details
app.get('/header', (req, res) => {
    const ipaddress = req.ip || req.headers['x-forwarded-for'],
          language  = req.headers['accept-language'].split(',')[0],
          software  = req.headers['user-agent'].split(/[()]/)[1];
    res.json(
        {
            ipaddress,
            language,
            software
        });
});

// Start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
