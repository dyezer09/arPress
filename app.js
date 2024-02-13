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



app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/pages/index.html");
  })

  app.get('/', parser, (req, res) => {
    let postDate = req.body.date;
    console.log(postDate);
    //console.log('afsfafas');
    res.sendFile(__dirname + "/pages/index.html");
  })


  app.post('/all', parser, (req, res) => {
    let postDate = req.body.date;
    db.run('INSERT INTO dates (date) VALUES (?)', [postDate], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Данные вставлены.');
    });
    res.sendFile(__dirname + "/pages/all.html");
  })




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })