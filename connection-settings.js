/*
  Mysql connection settings
*/

var mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'adminSgjdugT',
  password : 'jYr9aHsfDyik',
  database : 'nodejs'
});

// module.exports.connection = mysql.createConnection({
//   host     : '10.246.16.174',
//   port     : '3306',
//   user     : 'drmahima_com',
//   password : 'CjU6MQNu',
//   database : 'drmahima_com'
// });

