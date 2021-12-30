const db_config = require("./db_connection");
const Sequelize = require("sequelize");

class Database {
  db_config;
  Sequelize;
  constructor() {
    this.db_config = db_config;
    this.Sequelize = Sequelize;
  }

  getInstance() {
    const sequelize = new Sequelize(
      db_config.DB,
      db_config.USER,
      db_config.PASSWORD,
      {
        host: db_config.HOST,
        dialect: db_config.dialect,
        operatorsAliases: 0,

        pool: {
          max: db_config.pool.max,
          min: db_config.pool.min,
          acquire: db_config.pool.acquire,
          idle: db_config.pool.idle,
        },
      }
    );

    const db = {};

    db.apartment = sequelize.define("apartment", {
      apartment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: { type: Sequelize.STRING(64) },
      street: { type: Sequelize.STRING(64) },
      house_num: { type: Sequelize.INTEGER },
      floor_num: { type: Sequelize.INTEGER },
      room_amt: { type: Sequelize.INTEGER },
      square_amt: { type: Sequelize.INTEGER },
      cost: { type: Sequelize.INTEGER },
    });

    return db;
  }
}

module.exports = Database;
