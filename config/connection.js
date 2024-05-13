require("dotenv").config();

const Sequelize = require("sequelize");

//connection to mysql server using the dotenv package for environmental variables
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

module.exports = sequelize;
