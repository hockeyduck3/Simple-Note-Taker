// Dependency
var path = require('path');

// Server function
module.exports = function(server) {
    server.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    server.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}