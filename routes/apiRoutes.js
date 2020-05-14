// Dependencies
var data = require('../db/db.json');
var fs = require('fs');
var {v4: uuidv4} = require('uuid');
const util = require("util");

// Variables needed for reading and writing to the database
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// Server function
module.exports = function(server) {
    // Get JSON api
    server.get('/api/notes', function(req, res) {
        readFileAsync('./db/db.json', 'utf8').then(i => {
            let item = JSON.parse(i);

            return res.json(item)
        })
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
        return readFileAsync('./db/db.json', 'utf8').then(jsonRes => {
            let json = JSON.parse(jsonRes);

            json.push(note);

            return writeFileAsync('./db/db.json', JSON.stringify(json)).then(function () {
                return res.json(json);
            });
        }).catch(error => {
            throw error;
        });

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
        let newJson = data.filter(function(item) {
            return item.id !== deleteNote;
        });

        // Overwrite the saved JSON with the new (filtered) JSON
        fs.writeFileSync('./db/db.json', JSON.stringify(newJson));

        res.json({ok: true});
    })
}