const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const registerUser = function (user) {
  const userInfo = [`${user.name}`, `${user.password}`, `${user.email}`, `${user.phone}`, `${user.address}`];

  return pool
    .query(`
    INSERT INTO users (name, password, email, phone, address)
    VALUES ($1, $2, $3, $4, $5);
    `, userInfo)
}
