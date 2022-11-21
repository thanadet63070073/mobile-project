const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mobile',
});

const app = express();
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/account', (req, res, next) => {
    connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM account', function (error, result, fields) {
      if (error) {
        throw error;
      }
      res.json(result)
    });
  });
});

app.post('/login', (req, res, next) => {
  connection.query('SELECT * FROM account WHERE username = ? AND password = ?', [req.body.username, req.body.password], function(error, result, fields){
    // console.log(result);
    if(error){
      return res.json({status: 'error'});
    }
    if(result.length == 0){
      return res.json({status: 'not found'});
    }
    else{
      return res.json({accountData: result, status: "complete"});
    }
  });
})

app.post('/changePassword', async function(req, res, next){
  connection.query('UPDATE account SET password = ? WHERE account_id = ?', [req.body.password, req.body.account_id], function(error, result, fileds){
    if(error){
      return res.json({status: 'error'});
    }
    if(result.changedRows == 0){
      return res.json({status: "same"})
    }
    if(result.changedRows == 1){
      return res.json({status: "complete"});
    }
  });
});

app.post('/classTable', (req, res, next) => {
  const semester = req.body.semester.substring(0, 1);
  const year = req.body.semester.substring(2);
  if(req.body.role == "student"){
    connection.query('SELECT id, subjectname, day, startTime, endTime, room, building, classType, notification, subject_id FROM student_subsec CROSS JOIN subjectcatagory USING (subject_id) LEFT JOIN section ON (student_subsec.section_id = section.section_id) WHERE account_id = ? AND semester = ? AND year = ? ORDER BY day, startTime', [req.body.account_id, semester, year], function(error, result, fileds){
      if(error){
        return res.json({status: 'error'});
      }
      else{
        return res.json({classData: result, status: "complete"});
      }
    });
  }
  else{
    connection.query('SELECT id, subjectname, day, startTime, endTime, room, building, classType, notification, subject_id FROM student_subsec CROSS JOIN subjectcatagory USING (subject_id) LEFT JOIN section ON (student_subsec.section_id = section.section_id) WHERE teacher_id = ? AND semester = ? AND year = ? ORDER BY day, startTime', [req.body.account_id, semester, year], function(error, result, fileds){
      if(error){
        return res.json({status: 'error'});
      }
      else{
        return res.json({classData: result, status: "complete"});
      }
    });
  }
});

app.post('/examTable', (req, res, next) => {
  const semester = req.body.semester.substring(0, 1);
  const year = req.body.semester.substring(2);
  if(req.body.role == "student"){
    connection.query('SELECT id, account_id, subjectname, date, startTime, endTime, type, date_format(date, "%d-%m-%Y") as formatDate, WEEKDAY(date) as day from student_subsec CROSS JOIN subjectcatagory USING (subject_id) CROSS JOIN exam USING (subject_id) WHERE account_id = ? AND type = ? AND semester = ? AND year = ? GROUP BY subjectname ORDER BY date, startTime', [req.body.account_id, req.body.type, semester, year], function(error, result, fileds){
      if(error){
        return res.json({status: 'error'});
      }
      else{
        return res.json({examData: result, status: "complete"});
      }
    });
  }
  else{
    connection.query('SELECT id, account_id, subjectname, date, startTime, endTime, type, date_format(date, "%d-%m-%Y") as formatDate, WEEKDAY(date) as day from student_subsec CROSS JOIN subjectcatagory USING (subject_id) CROSS JOIN exam USING (subject_id) WHERE teacher_id = ? AND type = ? AND semester = ? AND year = ? GROUP BY subjectname ORDER BY date, startTime', [req.body.account_id, req.body.type, semester, year], function(error, result, fileds){
      if(error){
        return res.json({status: 'error'});
      }
      else{
        return res.json({examData: result, status: "complete"});
      }
    });
  }
});

app.post('/semester', (req, res, next) => {
  if(req.body.role == "student"){
    connection.query('select DISTINCT concat(semester, "/", year) as label, concat(semester, "/", year) as value from student_subsec where account_id = ? ORDER BY year DESC, semester DESC', [req.body.account_id], function(error, result, fields){
      if(error){
        return res.json({status: 'error'})
      }
      else{
        return res.json({semester: result, status: 'complete'});
      }
    });
  }
  else{
    connection.query('SELECT DISTINCT concat(semester, "/", year) as label, concat(semester, "/", year) as value FROM student_subsec join subjectcatagory WHERE teacher_id = ? ORDER BY year DESC, semester DESC', [req.body.account_id], function(error, result, fields){
      if(error){
        return res.json({status: 'error'})
      }
      else{
        return res.json({semester: result, status: 'complete'});
      }
    });
  }
  
});

app.post('/addNote', (req, res, next) => {
  connection.query('UPDATE subjectcatagory SET notification = ? WHERE subject_id = ?',
  [req.body.notification, req.body.subject_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      connection.query('SELECT account_id FROM mobile.student_subsec WHERE subject_id = ? GROUP BY account_id',
      [req.body.subject_id], function (error, result2, fields){
        if(error){
          return res.json({status: 'error'});
        }
        else{
          for(let i=0; i<result2.length; i++){
            connection.query('INSERT INTO notification (account_id, notification_name , notification_author, dateTime) VALUES(?, "add note", ?, CURRENT_TIMESTAMP) ',
            [result2[i].account_id, req.body.account_id], function (error, result3, fields) {
              if (error) {
                return res.json({status: 'error'});
              }
            });
          }
          return res.json({status: 'complete'});
        }
      });
    }
  });
});

app.post('/subjectData', (req, res, next) => {
  connection.query('SELECT subject_id, subjectname, notification, teacher_id, concat(account.fname, " ", account.lname) as teacher1, teacher2_id, concat(account2.fname, " ", account2.lname) as teacher2 FROM subjectcatagory JOIN account ON teacher_id = account_id LEFT JOIN account as account2 ON teacher2_id = account2.account_id WHERE subject_id = ?', 
  [req.body.subject_id], function (error, result, fields) {
    if (error) {
      return res.json({status: 'error'});
    }
    else{
      return res.json({result: result, status: 'complete'})
    }
  });
});

app.post('/chatData', (req, res, next) => {
  connection.query('SELECT sender_id, receiver_id, message, status, DATE_FORMAT(dateTime, "%W %d-%m-%Y") as dateTime, DATE_FORMAT(DateTime, "%H:%i") as Time FROM chat WHERE (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?) ORDER BY chat_id', [req.body.account_id, req.body.receiver_id,  req.body.receiver_id, req.body.account_id], function(error, result, fileds){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({chatData: result, status: "complete"});
    }
  });
});

app.post('/chatList', (req, res, next) => {
  connection.query('SELECT sender_id, concat(A.fname, " ", A.lname) as user1, receiver_id, concat(B.fname, " ", B.lname) as user2, count(CASE WHEN receiver_id = ? and status = "unread" THEN 1 END) as unread, room_id FROM chat INNER JOIN account as A ON A.account_id = sender_id INNER JOIN account as B ON B.account_id = receiver_id WHERE (sender_id = ? or receiver_id = ?) GROUP BY room_id ORDER BY dateTime',
  [req.body.account_id, req.body.account_id, req.body.account_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      res.json({listData: result, status: 'complete'});
    }
  });
});

app.post('/chat', (req, res ,next) =>{
  console.log(req.body.message)
  connection.query('INSERT INTO chat (sender_id, receiver_id, message, status, dateTime, room_id) VALUES (?, ?, ?, "unread", CURRENT_TIMESTAMP, ?)',
  [req.body.account_id, req.body.receiver_id, req.body.message, req.body.room_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({status: 'complete'});
    }
  });
})

app.post('/chatroom', (req, res, next) => {
  connection.query('SELECT * FROM chatroom WHERE (account_1 = ? AND account_2 = ?) OR (account_1 = ? AND account_2 = ?)',
  [req.body.account_id, req.body.receiver_id, req.body.receiver_id, req.body.account_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      if(result.length == 0){
        connection.query('INSERT INTO chatroom (account_1, account_2) VALUES (?, ?)',
        [req.body.account_id, req.body.receiver_id], function (error, result2, fields){
          if(error){
            return res.json({status: 'error'});
          }
          else{
            return res.json({room_id: result2.insertId,status: 'complete'});
          }
        });
      }
      else{
        return res.json({room_id: result[0].room_id, status: 'complete'});
      }
    }
  });
});

app.post('/readChat', (req, res, next) => {
  connection.query('UPDATE chat SET status = "read" WHERE sender_id = ? AND receiver_id = ?',
  [req.body.receiver_id, req.body.account_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      res.json({status: 'complete'});
    }
  });
});

app.post('/notification', (req, res, next) => {
  connection.query('SELECT notification_id, notification.account_id, notification_name, date_format(dateTime, "%d-%m-%Y") as date, date_format(dateTime, "%H:%i") as time, CONCAT(A.fname, " ", A.lname) as author_name FROM notification JOIN account as A ON notification_author = A.account_id WHERE notification.account_id = ? ORDER BY dateTime',
  [req.body.account_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({notificationData: result, status: 'complete'});
    }
  });
});

app.post('/deleteNotification', (req, res, next) => {
  connection.query('DELETE FROM notification WHERE notification_id = ?',
  [req.body.notification_id], function (error, result, fields){
    if(error){
      return res.json({status: 'error'});
    }
    else{
      return res.json({status: 'complete'});
    }
  });
});

// app.post('/register', (req, res, next) => {
//   console.log(req.body.username);
//   console.log(req.body.password);
//   connection.query('INSERT INTO account (username, password, employee_id) VALUES (?, ?, ?)',
//   [req.body.username, req.body.password, 27], function (error, result, fields){
//     if(error){
//       return res.json({status: 'error'});
//     }
//     res.json({status: 'complete'});
//   });
// });

// Starting our server.
app.listen(3000, () => {
 console.log('http://localhost:3000/account');
});
