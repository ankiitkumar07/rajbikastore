//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/raj-bika'));
app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/dist/raj-bika/index.html'));
    next();
});

app.post('/api/initiate-payment/', (req, res) => {

})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

/*
const crypto = require('crypto')
const hmac = crypto.createHmac('sha-256', '5b51513ef921fbc6afde1cd2a98b99e7ae478a9c')
hmac.update()
*/