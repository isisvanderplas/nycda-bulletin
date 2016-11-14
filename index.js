const express = require('express');
      pug = require('pug');
      morgan = require('morgan');
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize');

var app = express()
// add primary key
        sequelize = new Sequelize('isisvanderplas', 'isisvanderplas', '', { dialect: 'postgres' });

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

var Message = sequelize.define('message', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});


app.get('/', (request, response) => {
  Message.findAll({ order: 'id ASC' }).then((messages) => {
    response.render('messages/index', { messages: messages });
  });
});


app.get('/new', (request, response) => {
  response.render('messages/new');
});

app.post('/messages', (request, response) => {
  console.log('message posted');
  if (request.body.title) {
    Message.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/new');
  }
});


sequelize.sync().then(() => {
  console.log('connected to database');
  app.listen(3000, () => {
    console.log('Server is now running on port 3000');
  });
});


//
// app.get('/', (req, res) => {
//   res.redirect('/edit');
// });



// app.listen(3000, () => {
//   console.log('Webserver is running on port 3000')
// });
