// Dependencies
var fs = require('fs');
var {v4: uuidv4} = require('uuid');
const util = require("util");

// Variables needed for reading and writing to the database
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// id variable for saving a note
var id = '';

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
        // If the req comes back with an id then id will be set to that id
        if (req.body.id) {
            id = req.body.id;
        } else {
            // Create a new unique id for the note
            id = uuidv4();
        }

        // Save the note as an object
        var note = {
            title: req.body.title,
            text: req.body.text,
            id: id
        };

        // Write the new note to the JSON in the db folder
        return readFileAsync('./db/db.json', 'utf8').then(jsonRes => {
            let json = JSON.parse(jsonRes);

            // This will check and see if the user is saving a new note or editing a previous one
            if (req.body.id) {
                // If they are editing a previous note
                // This will go and find the index of the previous note in the database and replace it
                for (let i = 0; i < json.length; i++) {
                    if (json[i].id === note.id) {
                        var noteIndex = json.indexOf(json[i]);
                    }
                }
    
                json[noteIndex] = note;

            } else {
                json.push(note);
            }

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

        // Read the database file
        readFileAsync('./db/db.json', 'utf8').then(file => {
            // Parse the file into JSON
            let returnedJson = JSON.parse(file);

            // Loop through the saved notes and see which one has the matching id number
            for (let i = 0; i < returnedJson.length; i++) {
                if (returnedJson[i].id === idToDelete) {
                    var deleteNote = returnedJson[i].id;
                }
            }

            // Filter out the note with the matching id
            let newJson = returnedJson.filter(function(item) {
                return item.id !== deleteNote;
            });

            // Overwrite the saved JSON with the new (filtered) JSON
            fs.writeFileSync('./db/db.json', JSON.stringify(newJson));

            // Send back status 200
            res.json({ok: true});
        })
    })
}