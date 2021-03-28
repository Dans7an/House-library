const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var configDB = require('./config/database.js');

var db, collection;

const url = configDB.url;
const dbName = configDB.dbName;

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('library').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {library: result})
  })
})

app.post('/library', (req, res) => {
  db.collection('library').insertOne({title: req.body.title, author: req.body.author}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/library', (req, res) => {
  db.collection('library')
  .findOneAndUpdate({title: req.body.title, author: req.body.author}, {
    $set: {
      checkedOut: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/libraryOut', (req, res) => {
  db.collection('library')
  .findOneAndUpdate({title: req.body.title, author: req.body.author}, {
    $set: {
      checkedOut: false
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/library', (req, res) => {
  db.collection('library').findOneAndDelete({title: req.body.title, author: req.body.author}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Book deleted!')
  })
})
