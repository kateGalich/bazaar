DELETE from items;

INSERT INTO items
(id, seller_id, title, description, price, photo, created, sold_to)

VALUES
(1, 1, 'Antique table', 'Unique piece of furniture', 1000, 'https://images.metmuseum.org/CRDImages/ad/original/85G_ACF263R3.jpg', '2022-01-10', NULL),
(2, 2, 'Teddy bear', 'Teddy bear looking for new home', 10, 'https://i2.pickpik.com/photos/700/860/913/teddy-bank-sit-teddy-bear-preview.jpg', '2022-02-20', NULL),
(3, 1, 'Rolls Royce', 'Rolls Royce', 1000000, 'https://c4.wallpaperflare.com/wallpaper/243/801/127/rolls-royce-phantom-series-2-rolls-royce-wallpaper-preview.jpg', '2022-03-31', NULL),
(4, 3, 'Mini Cooper', 'Mini Cooper model 2019. Good condition', 60000, 'https://get.pxhere.com/photo/car-wheel-vehicle-bumper-mini-cooper-mini-city-car-land-vehicle-automobile-make-automotive-exterior-automotive-design-luxury-vehicle-subcompact-car-mini-e-101882.jpg', '2022-04-20', NULL),
(5, 1, 'Manor house', 'Manor house in United Kingdom', 50000000, 'https://c.pxhere.com/photos/2d/23/england_great_britain_united_kingdom_mansion_house_architecture_manor_house-1254863.jpg!d', '2022-03-31', NULL),
(6, 2, 'Cat', '1 yo cat looking for new home', 10, 'https://images.pexels.com/photos/982300/pexels-photo-982300.jpeg?cs=srgb&dl=orange-tabby-cat-on-brown-knitted-textile-982300.jpg&fm=jpg', '2022-05-02', NULL),
(7, 4, 'Books', 'Home library sell', 10, 'https://get.pxhere.com/photo/book-vintage-antique-pattern-red-shelf-furniture-bookshelf-bookcase-literature-library-books-elegant-shelving-classic-bookshop-aged-volumes-bookselling-1098498.jpg', '2022-06-22', NULL),
(8, 5, 'Candles', 'Hand made candles. Different sizes, forms, taste', 10, 'https://get.pxhere.com/photo/purple-decoration-column-candle-lighting-decor-flowers-candles-decorative-wedding-cake-wedding-ceremony-supply-unity-candle-1374277.jpg', '2022-07-22', NULL)

;


