require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

module.exports = {
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQL_DATABASE || 'blogs-api',
  dialect: process.env.DIALECT || 'mysql',
  storage: './tests/database.sqlite',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: 'false',
};
