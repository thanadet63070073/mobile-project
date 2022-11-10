const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'thanadet123@',
  database: 'dbsc_restaurant',
});

const app = express();
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/menu', (req, res, next) => {
    
    connection.getConnection(function (err, connection) {

    connection.query('SELECT * FROM menu', function (error, results, fields) {
      if (error) {
        throw error;
      }
      res.json(results)
    });
  });
});

app.post('/register', (req, res, next) => {
  console.log(req.body.username);
  console.log(req.body.password);
  connection.query('INSERT INTO account (username, password, employee_id) VALUES (?, ?, ?)',
  [req.body.username, req.body.password, 27], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    res.json({status: 'complete'});
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('http://localhost:3000/menu');
});