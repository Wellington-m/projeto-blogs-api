require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

module.exports = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  dialect: process.env.DB_DIALECT,
  storage: './tests/database.sqlite',
};
