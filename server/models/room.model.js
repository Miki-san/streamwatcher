module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
        room_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        max_guests: {
            type: Sequelize.INTEGER
        },
        created_by: {
            type: Sequelize.STRING
        },
        pwd_hash: {
            type: Sequelize.STRING
        },
        file_path: {
            type: Sequelize.STRING
        }
    });

    (async () => {
        await sequelize.sync({ force: true });
        // Code here
    })();
    return Room;
};

