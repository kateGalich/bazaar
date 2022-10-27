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

const registerUser = function(user) {
  const userInfo = [`${user.name}`, `${user.password}`, `${user.email}`, `${user.phone}`, `${user.address}`];

  return pool
    .query(`
    INSERT INTO users (name, password, email, phone, address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, userInfo)
    .then((result) => {
      console.log(result.rows[0]);
      return Promise.resolve(result.rows[0])
    })
    .catch ((err) => {
      console.log(err);
    })
};

// const loginUser = function(user) {
//   const userInfo = [`${user}`];

//   return pool
//     .query(`
//     SELECT * FROM users
//     WHERE id = $1
//     `, userInfo)
//     .then((result) => {
//       console.log(result.rows[0]);
//       return Promise.resolve(result.rows[0]);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// };

// const loginUser = function(user) {
//   const userInfo = [`${user}`];

//   return pool
//     .query(`
//     SELECT * FROM users
//     WHERE id = $1
//     `, userInfo)
//     .then((result) => {
//       console.log(result.rows[0]);
//       return Promise.resolve(result.rows[0]);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// };
// exports.loginUser = loginUser;

module.exports = { getUsers, getUser, getCurrentUser, getUserByEmail, registerUser };
