//Install express server
const cors = require('cors')
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/raj-bika'));
app.use(cors());
app.get('/*', function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://test.cashfree.com/billpay/checkout/post/submit');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE, OPTIONS');
    res.sendFile(path.join(__dirname + '/dist/raj-bika/index.html'));

    next();
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);