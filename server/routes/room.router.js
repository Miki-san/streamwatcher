const multer = require("multer");
const fs = require("fs")
storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'uploads/' + req.params.room_id
        fs.mkdirSync(path, {recursive: true})
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

module.exports = app => {
    const tutorials = require("../controllers/room.controller.js");

    let router = require("express").Router();

    router.post("/create", tutorials.create);
    router.delete("/delete/:room_id", tutorials.delete);
    router.get("/:room_id", tutorials.findOne);
    router.put("/update/:room_id", tutorials.create);
    router.post("/upload/:room_id", upload.single("video"), tutorials.uploadFile);


    app.use('/api/rooms', router);
};