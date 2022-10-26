DELETE from messages;

INSERT INTO messages
(to_user, item_id, from_user, text_message, created)
VALUES
(1, 3, 5, 'Hello, I like this car', '2022-02-10'),
(2, 6, 1, 'Hello', '2022-07-30'),
(2, 2, 4, 'Hello', '2022-08-31'),
(5, 8, 1, 'Hello', '2022-09-18'),
(1, 1, 3, 'Hello. What is you location?', '2022-10-10'),
(1, 1, 3, 'Can I come today?', '2022-10-20'),
(1, 1, 3, 'What time?', '2022-10-20'),
(3, 1, 1, 'It is still available', '2022-10-20'),
(3, 1, 1, 'whenever', '2022-10-20'),
(3, 1, 1, 'Bring cash!', '2022-10-20'),
(1, 1, 3, 'Will do', '2022-10-20')

;

