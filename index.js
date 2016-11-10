const express = require('express');
      pug = require('pug');
      morgan = require('morgan');
      Sequelize = require('sequelize');

var app = express()
// add primary key
        sequelize = new Sequelize('isisvanderplas', 'isisvanderplas', '', { dialect: 'postgres' });

app.use(morgan('dev'));

app.set('view engine', 'pug');
