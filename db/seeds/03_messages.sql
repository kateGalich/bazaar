DELETE from messages;

INSERT INTO messages
(id, seller_id, item_id, buyer_id,text_message, created)
VALUES
(1, 1, 3, 5, 'Hello, I like this car', '2022-02-10'),
(2, 2, 6, 1, 'Hello', '2022-07-30'),
(3, 2, 2, 4, 'Hello', '2022-08-31'),
(4, 5, 8, 1, 'Hello', '2022-09-18'),
(5, 1, 1, 3, 'Hello. What is you location?', '2022-10-10'),
(6, 1, 1, 3, 'Can I come today?', '2022-10-20')
;

