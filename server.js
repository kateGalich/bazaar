// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

// temporarily importing here
const { getItems, getItem } = require('./db/queries/items');

const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['midtermSession'],

  maxAge: 24 * 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users.js');
const { loginUser, fetchMessages } = require('./routes/database');
const { user } = require('pg/lib/defaults');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

let getCurrentUser = function (req) {
  //return { email: "test@email.com" }
  return null;
};

app.get('/', (req, res) => {
  getItems(req.query).then(items => {
    const viewData = {
      user: getCurrentUser(req),
      items: items,
      query: req.query
    };
    res.render('index', viewData);
  });
});


app.get('/item/:id', (req, res) => {
  let viewData
  fetchMessages(req.params.id).then(result => {
    getItem(req.params.id).then(item => {
      viewData = {
        messages: result,
        user: req.session.user_id,
        item: item
      };
      if (viewData.user == viewData.messages[0].seller_id) {
        viewData.isSeller = true;
      } else {
        viewData.isSeller = false;
      }
      console.log(viewData);
      res.render('item', viewData);
    })
  });
});

app.get('/register', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('register', viewData);
});

app.get('/login', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('login', viewData);
})

app.get('/messages', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('messenger', viewData);
});

app.get('/newlisting', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('postlisting', viewData);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
