// Dependency
var data = require('../db/db.json');
var fs = require('fs');

// Server function
module.exports = function(server) {
    server.get('/api/notes', function(req, res) {
        return res.json(data);
    });
}