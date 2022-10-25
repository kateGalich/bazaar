const db = require('../connection');

const getItems = () => {
  return db
    .query('SELECT * FROM items;')
    .then((data) => data.rows);
};

module.exports = {
  getItems: getItems
};
