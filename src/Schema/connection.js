const Sequelize = require('sequelize');

const Connection = new Sequelize('underground', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = Connection;