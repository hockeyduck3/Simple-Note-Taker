// Dependency
var data = require('../db/db.json');
var fs = require('fs');
var {v4: uuidv4} = require('uuid')

// Server function
module.exports = function(server) {
    server.get('/api/notes', function(req, res) {
        return res.json(data);
    });

    server.post('/api/notes', function(req, res) {
        let id = uuidv4();

        let note = {
            title: req.body.title,
            text: req.body.text,
            id: id
        };


        fs.readFile('./db/db.json', 'utf8', function(err, res) {
            if (err) throw err;

            let json = JSON.parse(res);

            json.push(note);

            fs.writeFileSync('./db/db.json', JSON.stringify(json))
        })
    });
}