const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // RENDER / PRODUCTION MODE
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // <--- THIS is what the error is asking for
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // LOCAL DEVELOPMENT MODE
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres', // Make sure this matches your local DB too
      port: 5432
    }
  );
}

module.exports = sequelize;
