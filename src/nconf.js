var fs = require('fs'),
  nconf = require('nconf');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv().env().file({ file: './config.json' });

//
// Set a few variables on `nconf`.
//
nconf.set('database:host', '127.0.0.1');
nconf.set('database:port', 5984);

//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
console.log('database: ' + JSON.stringify(nconf.get('database')));
nconf.save();
// nconf.save(function (err) {
//   // fs.readFile('./config.json', function (err, data) {
//   //   console.dir(JSON.parse(data.toString()));
//   // });
// });
