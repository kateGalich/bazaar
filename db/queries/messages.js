const db = require('../connection');

const fetchMessages = function(messages) {
  const itemInfo = [`${messages}`];

  return db
    .query(`
      SELECT *
      FROM messages
      LEFT JOIN items ON item_id = items.id
      WHERE items.id = $1
      ORDER BY messages.created
    `, itemInfo)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    })
};
exports.fetchMessages = fetchMessages;
