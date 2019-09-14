const Note = require("../model/note.model");

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Body can not be empty"
    });
  }
  const note = new Note({
    title: req.body.title || "Untitled",
    content: req.body.content
  });

  note
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: "Something's wrong"
      });
    });
};



exports.findAll = (req, res) => {
  Note.find()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: "Something's wrong"
      });
    });
};



exports.find = (req, res) => {
  Note.findById(req.params.noteId)
    .sort({_id: 1})
    .then(note => {
      if (!note) {
        return res.status(500).send({
          message: "Note Not Available By This Id"
        });
      }
      res.send(note);
    })
    .catch(e => {
      if (e.kind === "ObjectId") {
        return res.status(500).send({
          message: "Wrong Id, Not Available"
        });
      }
      res.status(500).send({
        message: "Something went wrong"
      });
    });
};



exports.update = (req, res) => {
   if(!req.body.content){
      return res.status(400).send({
         message: "Body content is required"
      });
   }
   Note.findByIdAndUpdate(req.params.noteId, {
      title: req.body.title || "Untitled Note",
      content: req.body.content
   }, {new: true})
     .then(note => {
       if (!note) {
         return res.status(500).send({
           message: "Note Not Available By This Id"
         });
       }
       res.send(note);
     })
     .catch(e => {
       if (e.kind === "ObjectId") {
         return res.status(500).send({
           message: "Wrong Id, Not Available"
         });
       }
       res.status(500).send({
         message: "Something went wrong"
       });
     });
 };


 
 exports.delete = (req, res) => {
   Note.findByIdAndRemove(req.params.noteId)
     .then(note => {
       if (!note) {
         return res.status(500).send({
           message: "Note Not Available By This Id"
         });
       }
       res.send(note);
     })
     .catch(e => {
       if (e.kind === "ObjectId") {
         return res.status(500).send({
           message: "Wrong Id, Not Available"
         });
       }
       res.status(500).send({
         message: "Something went wrong"
       });
     });
 };