const Sequelize  = require("sequelize");
const Connection = require("../Schema/connection");

const CarsModel = Connection.define('carsmodel', {
    CarId:{
        type: Sequelize.STRING,
        allowNull: true
    },
    CarName:{
        type: Sequelize.STRING,
        allowNull: true
    },

});

CarsModel.sync({force: false}).then(() => {});
module.exports = CarsModel;