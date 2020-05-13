// Dependencies
var data = require('../db/db.json');
var fs = require('fs');
var {v4: uuidv4} = require('uuid')

// Server function
module.exports = function(server) {
    // Get JSON api
    server.get('/api/notes', function(req, res) {
        return res.json(data);
    });

    // Post to the JSON api
    server.post('/api/notes', function(req, res) {
        // Create a new unique id for the note
        let id = uuidv4();

        // Save the note as an object
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: id
        };

        // Write the new note to the JSON in the db folder
        fs.readFile('./db/db.json', 'utf8', function(err, res) {
            if (err) throw err;

            let json = JSON.parse(res);

            json.push(note);

            fs.writeFileSync('./db/db.json', JSON.stringify(json));
        })
    });

    // Delete a note function
    server.delete('/api/notes/:id', function(req, res) {
        // Grab which id of the note that the user clicked on
        let idToDelete = req.params.id;

        // Loop through the saved notes and see which one has the matching id number
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === idToDelete) {
                var deleteNote = data[i].id;
            }
        }

        // Filter out the note with the matching id
        let newJson = data.filter(function(res) {
            return res.id !== deleteNote;
        })

        // Overwrite the saved JSON with the new (filtered) JSON
        fs.writeFileSync('./db/db.json', JSON.stringify(newJson))
    })
}