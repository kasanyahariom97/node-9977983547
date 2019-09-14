module.exports = (app) => {

   const notes = require("../controllers/note.controller");

   // Create a new note
   app.post('/notes', (r, s) => notes.create(r, s));

   // Get all notes
   app.get('/notes', (r, s) => notes.findAll(r, s));

   // Get one note
   app.get('/notes/:noteId', (r, s) => notes.find(r, s));

   // Update a note by id
   app.put('/notes/:noteId', (r, s) => notes.update(r, s));

   // Delete a note by id
   app.delete('/notes/:noteId', (r, s) => notes.delete(r, s));
}