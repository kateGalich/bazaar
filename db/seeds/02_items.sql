DELETE from items;

INSERT INTO items
(id, seller_id, title, description, price, photo, created, sold_to)

VALUES
(1, 1, 'Antique table', 'Unique piece of furniture', 1000, 'https://images.metmuseum.org/CRDImages/ad/original/85G_ACF263R3.jpg', '2022-01-10', NULL),
(2, 2, 'Teddy bear', 'Teddy bear looking for new home', 10, 'https://i2.pickpik.com/photos/700/860/913/teddy-bank-sit-teddy-bear-preview.jpg', '2022-02-20', NULL),
(3, 1, 'Rolls Royce', 'Rolls Royce', 1000000, 'https://c4.wallpaperflare.com/wallpaper/243/801/127/rolls-royce-phantom-series-2-rolls-royce-wallpaper-preview.jpg', '2022-03-31', NULL),
(4, 3, 'Mini Cooper', 'Mini Cooper model 2019. Good condition', 60000, 'https://images.pexels.com/photos/295510/pexels-photo-295510.jpeg?cs=srgb&dl=classic_mini-mini-mini-cooper-295510.jpg&fm=jpg', '2022-04-20', NULL),
(5, 1, 'Manor house', 'Manor house in United Kingdom', 50000000, 'https://cdn.pixabay.com/photo/2018/08/10/15/44/ireland-3597097_960_720.jpg', '2022-03-31', NULL),
(6, 2, 'Cat', '1 yo cat looking for new home', 10, 'https://images.pexels.com/photos/978959/pexels-photo-978959.jpeg?cs=srgb&dl=cute-cat-978959.jpg&fm=jpg', '2022-05-02', NULL),
(7, 4, 'Books', 'Home library sell', 10, 'https://images.pexels.com/photos/62342/pexels-photo-62342.jpeg?cs=srgb&dl=books-62342.jpg&fm=jpg', '2022-06-22', NULL),
(8, 5, 'Candles', 'Hand made candles. Different sizes, forms, taste', 10, 'https://i2.pickpik.com/photos/99/444/1021/christmas-deco-decoration-advent-preview.jpg', '2022-07-22', NULL)

;


