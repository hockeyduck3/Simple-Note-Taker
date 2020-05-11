// Dependency
var path = require('path');

// Server function
module.exports = function(server) {
    server.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    });

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}