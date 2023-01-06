const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const app = express();
app.disable('view cache');

/* Handlebars */
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

/* Session initialization */
app.use(session({ secret: process.env.SECRET }));

/* Passport initialization */
app.use(passport.initialize());
app.use(passport.session());

/* Standard middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

/* Routes for auth and user */
app.use('/user', (req, res, next) => {
  if (req.session && req.user) {
    next();
  }
  else (res.redirect('/no-permission'));
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
