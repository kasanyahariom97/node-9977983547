const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const bodyParser = require("body-parser");

const dbConfig = require('./config/note.config');

app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.sendFile('index.html');
});

require("./app/routes/note.routes")(app);

mongoose.connect(dbConfig.url, {
   useNewUrlParser: true
}).then((data) => {
   console.log("Success")
}).catch(e => {
   console.log("Error " + e);
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
   console.log("Server Running At 3001");
});