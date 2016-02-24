/*
  Mysql connection settings
*/

var mysql = require('mysql');

var mysql_host = process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost';
var mysql_port = process.env.OPENSHIFT_MYSQL_DB_PORT || '3306';
var mysql_user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
var mysql_password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'pass';

module.exports.connection = mysql.createConnection({
  host     : mysql_host,
  port     : mysql_port,
  user     : mysql_user,
  password : mysql_password,
  database : 'drmahima_com'
});

// module.exports.connection = mysql.createConnection({
//   host     : '10.246.16.174',
//   port     : '3306',
//   user     : 'drmahima_com',
//   password : 'CjU6MQNu',
//   database : 'drmahima_com'
// });

