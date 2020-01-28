var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'krup'
});

connection.connect();


connection.query('select * from userinfo', function (error, results, fields) {
  if (error) throw error;
  console.log(results);

  // console.log('The solution is: ', JSON.stringify(results));
});

connection.end();