module.exports = app => {
    const tutorials = require("../controllers/room.controller.js");

    let router = require("express").Router();

    router.post("/create", tutorials.create);
    router.delete("/delete/:room_id", tutorials.delete);
    router.get("/:room_id", tutorials.findOne);
    router.put("/update/:room_id", tutorials.create);

    app.use('/api/rooms', router);
};