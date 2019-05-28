const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jecode4bdx',
  database: 'sport',
});
module.exports = connection;
