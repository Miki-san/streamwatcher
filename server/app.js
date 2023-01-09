const express = require('express');
const cors = require("cors");
const utils = require("./utils")
const db = require("./models");
const multer = require("multer")

const app = express();

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



require("./routes/room.router")(app);

app.get('/video', (req, res) => {
    res.sendFile('assets/video.mp4', {root: __dirname});
});

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});