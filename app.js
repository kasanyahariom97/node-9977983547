const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const dbConfig = require('./config/note.config');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.sendFile('index.html');
});

require("./app/routes/note.routes")(app);

app.listen(3001, () => {
   console.log("Server Running At 3001");
});

mongoose.connect(dbConfig.url, {
   useNewUrlParser: true
}).then((data) => {
   console.log("Success")
}).catch(e => {
   console.log("Error " + e);
});