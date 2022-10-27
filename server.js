// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

// temporarily importing here
const { getItems, getItem } = require('./db/queries/items');
const { getUser, getCurrentUser, getUserByEmail } = require('./db/queries/users');

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
const { user } = require('pg/lib/defaults');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Show error page to user
const renderError = function (req, res, message, statusCode = 400) {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user,
        message: message
      };
      res.status(statusCode);
      res.render("error", viewData);
    });
};

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// get home page
app.get('/', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      getItems(req.query)
        .then(items => {
          const viewData = {
            user: user,
            items: items,
            query: req.query
          };
          res.render('index', viewData);
        });
    });
});

//view one item
app.get('/item/:id', (req, res) => {
  // let viewData
  // fetchMessages(req.params.id).then(result => {
  //   getItem(req.params.id).then(item => {
  //     viewData = {
  //       messages: result,
  //       user: req.session.user_id,
  //       item: item
  //     };
  //     if (viewData.user == viewData.messages[0].seller_id) {
  //       viewData.isSeller = true;
  //     } else {
  //       viewData.isSeller = false;
  //     }
  //     console.log(viewData);
  //     res.render('item', viewData);
  //   })
  // });
  getCurrentUser(req)
    .then(user => {
      getItem(req.params.id)
        .then(item => {
          const viewData = {
            user: user,
            item: item
          };
          if (req.session.user_id) {
            if (viewData.item.seller_id == viewData.user.id) {
              viewData.item.isSeller = true;
            } else {
              viewData.item.isSeller = false;
            }
          }
          console.log(viewData);
          res.render('item', viewData);
        });
    });
});

app.get('/register', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user
      };
      res.render('register', viewData);
    });
});

app.get('/login', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user
      };
      res.render('login', viewData);
    });
});

app.post("/login", (req, res) => {
  getUserByEmail(req.body.email)
    .then(user => {

      if (!user) {
        renderError(req, res, 'Username and password not matched!', 401);
        return;
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        renderError(req, res, 'Username and password not matched!', 401);
        return;
      }
      req.session.user_id = user.id;
      res.redirect('/');
    });
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


app.get('/messages', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('messenger', viewData);
});

// get create new page
app.get('/newlisting', (req, res) => {
  const viewData = {
    user: getCurrentUser(req),
  };
  res.render('postlisting', viewData);
});

// get list of user's items ...
// delete item


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
