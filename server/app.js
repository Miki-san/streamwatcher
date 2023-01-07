const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/penis', (req, res) => {
    res.send('pipiska')
});

app.get('/video', (req, res) => {
    res.sendFile('assets/videoplayback.mp4', { root: __dirname });
});

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});