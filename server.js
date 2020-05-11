// Dependency
var express = require('express');

// Variables for the server
var server = express();
var PORT = 8000;


// Routes
require('./routes/apiRoutes')(server);
require('./routes/htmlRoutes')(server);


// Listen
server.listen(PORT, () => {
    console.log(`Server is up and runnning on http://localhost:${PORT}`)
})