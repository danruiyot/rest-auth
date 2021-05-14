const Sequelize = require('sequelize');
const sequelize = new Sequelize('mynodese', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Auth = require('../app/models/auth')(sequelize, Sequelize);

module.exports = db;