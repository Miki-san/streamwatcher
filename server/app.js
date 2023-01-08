const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const utils = require("./utils")

const app = express();

const db = require("./models");
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

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/room.router")(app);

app.get('/video', (req, res) => {
    res.sendFile('assets/video.mp4', { root: __dirname });
});

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});