// Dependency
var data = require('../db/db.json');

// Server function
module.exports = function(server) {
    server.get('/api/notes', (req, res) => {
        return res.json(data);
    })
}