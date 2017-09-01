// Dependencies
const express          = require('express'),
      expressValidator = require('express-validator'),
      path             = require('path'),
      bodyParser       = require('body-parser'),
      router           = express.Router(),

      scripts          = require('./scripts'),

// Server setup
      app              = express(),
      port             = 3000;


// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-parser Middleware setup
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("HELLO");
});

app.get('/:arg', (req, res) => {
    console.log(req.path);
    const hurm = scripts.parseArgument(req.path.substr(1));
    console.log(hurm);
    res.json(hurm);
});

// Start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
