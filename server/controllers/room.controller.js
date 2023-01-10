const db = require("../models");
const Room = db.rooms;
const Op = db.Sequelize.Op;
const utils = require("../utils")
const multer = require("multer");
const fs = require("fs")
const path = require("path")

exports.create = (req, res) => {
    if (!req.body.created_by) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const room = {
        room_id: utils.makeid(6),
        created_by: req.body.created_by,
        pwd_hash: req.body.password ? req.body.password.hashCode() : null,
        max_guests: req.body.max_guests
    };

    Room.create(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.room_id;

    Room.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Room with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving room with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.room_id;

    Room.update(req.body, {
        where: {room_id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Room was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.room_id;

    Room.destroy({
        where: {room_id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Room was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id=" + id + "\n" + err
            });
        });
};

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({msg: "No file uploaded"});
    }
    return res.status(200).json({
        msg: "Upload successful",
        filename: req.file.originalname
    })
}

exports.getFiles = (req, res) => {
    let id = req.params.room_id
    let path = `./uploads/${id}/`
    if (fs.existsSync(path)) {
        fs.readdir(path, (err, files) => {
            return res.json({
                status: "success",
                file_count: files.length,
                file_names: files
            })
        });
    } else {
        res.status(404).json({
            status: "failure",
            msg: "Room not found"
        })
    }
}

exports.selectFile = (req, res) => {
    let id = req.params.room_id
    let filename = req.body.filename
    console.log(`./uploads/${id}/${filename}`)
    if (!filename || !fs.existsSync(`./uploads/${id}/${filename}`)) {
        return res.status(400).json({
            status: "failure",
            msg: "File not specified or does not exist"
        })
    }
    Room.update({file_path: filename}, {
        where: {room_id: id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({
                    msg: "File selected successfully"
                });
            } else {
                res.send({
                    msg: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            })
        })

}

exports.video = (req, res) => {
    let id = req.params.room_id
    Room.findByPk(id)
        .then(data => {
            if (data) {
                res.sendFile(path.resolve(`uploads/${id}/${data.get("file_path")}`), {acceptRanges: false});
            } else {
                res.status(404).send({
                    message: `Cannot find Room with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving room with id=" + id
            });
        });
}
