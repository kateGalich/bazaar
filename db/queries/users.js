const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUser = (userId) => {
  let sql = 'SELECT * FROM users WHERE id=$1;';
  let values = [userId];

  return db.query(sql, values)
    .then((result) => {
      return result.rows[0];
    });
};

const getCurrentUser = function(req) {
  return getUser(req.session.user_id);
};

const getUserByEmail = function(email) {
  let sql = 'SELECT * FROM users WHERE email=$1;';
  let values = [email];

  return db.query(sql, values)
    .then((result) => {
      return result.rows[0];
    });
};
module.exports = { getUsers, getUser, getCurrentUser, getUserByEmail };
