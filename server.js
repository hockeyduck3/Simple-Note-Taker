// Dependency
var express = require('express');

// Variables for the server
var server = express();
var PORT = 3000;

// Data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('./public'));

// Routes
require('./routes/apiRoutes')(server);
require('./routes/htmlRoutes')(server);


// Listen
server.listen(PORT, () => {
    console.log(`Server is up and runnning on http://localhost:${PORT}`)
})