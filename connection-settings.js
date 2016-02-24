/*
  Mysql connection settings
*/

var mysql = require('mysql');

var mysql_host = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
var mysql_port = process.env.OPENSHIFT_MYSQL_DB_PORT || '3306';

module.exports.connection = mysql.createConnection({
  host     : mysql_host,
  port     : mysql_port,
  user     : 'adminSgjdugT',
  password : 'jYr9aHsfDyik',
  database : 'drmahima_com'
});

// module.exports.connection = mysql.createConnection({
//   host     : '10.246.16.174',
//   port     : '3306',
//   user     : 'drmahima_com',
//   password : 'CjU6MQNu',
//   database : 'drmahima_com'
// });

