const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const bodyParser = require('body-parser');



const db = new sqlite3.Database('db.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Подключено к базе данных.');
});


const app = express();
const port = 5500;

const parser = bodyParser.urlencoded({
    extended: false,
});


  app.get('/', parser, (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
  })







  app.post('/', parser, (req, res) => {
    let postDate = req.body.date;
    console.log(req.body.upper)
    db.run('INSERT INTO dates (date) VALUES (?)', [postDate], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Данные вставлены.');
    });  
    res.sendFile(__dirname + "/pages/index.html");
  })







  app.get('/all', parser, (req, res) => {
    str = ""
    str1 = ""
    db.all('SELECT * FROM dates', [], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      rows.forEach((row) => {
       // console.log(row);
        str1 = row.date;
        str=str+str1+"<hr>"
       // console.log(str);
      });
      res.send(str);
    });
    //toDo : raw text по этому запросу <hr>
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })