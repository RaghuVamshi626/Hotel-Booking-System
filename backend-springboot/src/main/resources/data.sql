-- =====================================================
-- SEED DATA: Aura Haven Luxury Resort Sanctuaries
-- Matches frontend data.ts for consistency
-- =====================================================

-- Hotel 1: The Grand Oasis Resort & Spa (Bali)
INSERT INTO hotels (id, name, location, rating, description, base_price, image_url) VALUES
(1, 'The Grand Oasis Resort & Spa', 'Bali, Indonesia', 4.9,
 'An idyllic tropical sanctuary nestled along the pristine shorelines of Nusa Dua. Offering fully integrated automated pool villas, private beaches, Michelin-starred wellness cuisines, and ancient sound-healing therapies.',
 26500, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200');

-- Hotel 2: Aura Chalet Skyline (Switzerland)
INSERT INTO hotels (id, name, location, rating, description, base_price, image_url) VALUES
(2, 'Aura Chalet Skyline', 'Zermatt, Switzerland', 4.8,
 'An architectural ski-in, ski-out wonder situated in the snow-capped elevations of Zermatt. Featuring thermal pools, glass dome stargazing ceilings, and indoor fireplaces controlled via modern app systems.',
 34500, 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1200');

-- Hotel 3: The Urban Ritz Sanctuary (Tokyo)
INSERT INTO hotels (id, name, location, rating, description, base_price, image_url) VALUES
(3, 'The Urban Ritz Sanctuary', 'Tokyo, Japan', 4.95,
 'Sleek metropolitan luxury hovering high above the neon skyline of Tokyo. Boasting traditional Zen gardens inside sky lobbies, traditional teahouses, and fully robotic room delivery services.',
 41500, 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200');

-- Hotel 4: Aura Mediterranean Palace (Santorini, Greece)
INSERT INTO hotels (id, name, location, rating, description, base_price, image_url) VALUES
(4, 'Aura Mediterranean Palace', 'Santorini, Greece', 4.9,
 'A breathtaking cliffside sanctuary overlooking the deep blue Aegean Sea. Featuring white-washed cave villas, private infinity pools, world-class thermal spas, and sunset wine tastings.',
 29500, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200');

-- Hotel 5: The Safari Lodge Oasis (Serengeti, Tanzania)
INSERT INTO hotels (id, name, location, rating, description, base_price, image_url) VALUES
(5, 'The Safari Lodge Oasis', 'Serengeti, Tanzania', 4.85,
 'An ultra-luxurious eco-friendly haven nestled in the heart of the Serengeti wild. Featuring high-ceiling canvas suites, private wildlife viewing decks, elevated plunge pools, and open-air fine dining.',
 32000, 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200');

-- =====================================================
-- HOTEL AMENITIES
-- =====================================================

-- Bali amenities
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (1, 'Spa');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (1, 'Pool');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (1, 'Private Beach');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (1, 'Michelin Restaurant');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (1, 'Valet Parking');

-- Switzerland amenities
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (2, 'Pool');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (2, 'Fitness Center');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (2, 'Private Beach');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (2, 'Michelin Restaurant');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (2, 'Valet Parking');

-- Tokyo amenities
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (3, 'Michelin Restaurant');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (3, 'Fitness Center');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (3, 'Valet Parking');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (3, 'High-Speed Wifi');

-- Santorini amenities
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (4, 'Spa');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (4, 'Pool');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (4, 'Fitness Center');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (4, 'Michelin Restaurant');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (4, 'Valet Parking');

-- Serengeti amenities
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (5, 'Spa');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (5, 'Pool');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (5, 'Fitness Center');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (5, 'Michelin Restaurant');
INSERT INTO hotel_amenities (hotel_id, amenities) VALUES (5, 'Valet Parking');

-- =====================================================
-- ROOMS
-- =====================================================

-- Bali Rooms
INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(1, '101', 'Grand Lagoon Villa',
 'Immerse yourself in lush greenery with private walk-in lagoon access, a private freshwater pool, automated blinds, and our signature rainfall shower garden.',
 26500, 2, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600', true, 1);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(2, '102', 'Deluxe Ocean Suite',
 'Breathtaking 180-degree ocean views framed by floor-to-ceiling glass. Features a massive marble deck, private sunset jacuzzi, and intelligent ambient lighting.',
 39500, 3, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600', true, 1);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(3, 'P1', 'Presidential Beachfront Penthouse',
 'Our crown jewel. Spanning 2,500 sq ft of indoor-outdoor luxury, complete with a private infinity rooftop pool, full chef kitchen, and private elevator access.',
 78500, 6, 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600', true, 1);

-- Switzerland Rooms
INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(4, '301', 'Alpine Vista Loft',
 'Elegant pine wood design featuring a custom suspended wood fireplace, majestic Matterhorn mountain vistas, and a private ski gear locker.',
 34500, 2, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600', true, 2);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(5, '302', 'Glacier Panoramic Suite',
 'Stunning glass dome ceiling that allows you to gaze at Zermatt constellations from your custom king bed. Fitted with deep copper soaking tubs.',
 48500, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600', true, 2);

-- Tokyo Rooms
INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(6, '4201', 'Skyline Deluxe Studio',
 'Gaze down at Shinjuku skylines. Fitted with automated smart home systems, voice control, premium Japanese cypress baths, and modular workspace layouts.',
 41500, 2, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600', true, 3);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(7, '4202', 'Zen Garden Presidential Suite',
 'A masterpiece combining authentic tatami mats and stone gravel gardens with modern 8K screens, custom whiskey cellars, and panoramic dual-exposure skylines.',
 99500, 4, 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600', true, 3);

-- Santorini Rooms (Hotel 4)
INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(8, '401', 'Deluxe Aegean Suite',
 'Elegant suite overlooking caldera vistas, featuring a private cave pool, traditional Cycladic arches, and automated temperature controls.',
 29500, 2, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600', true, 4);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(9, '402', 'Caldera Pool Villa',
 'A large private villa perched on Oia cliffs. Complete with a heated infinity pool, automated surround-sound audio systems, and local organic wines.',
 45000, 3, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600', true, 4);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(10, '403', 'Panoramic Cliff Studio',
 'Sleek studio layout offering 360-degree sunset ocean views, private stargazing balcony, and minimalist stone-crafted bathroom.',
 32000, 2, 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600', true, 4);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(11, 'C1', 'Honeymoon Luxury Cave',
 'An authentic white stone cave suite designed for romance. Featuring a grand indoor-outdoor plunge pool and intelligent wellness lighting.',
 55000, 2, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600', true, 4);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(12, 'C2', 'Royal Blue Sea Suite',
 'Our largest caldera suite. Features a massive marble deck, private sunset jacuzzi, 8K projector screens, and 24/7 butler service.',
 62000, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600', true, 4);

-- Serengeti Rooms (Hotel 5)
INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(13, '501', 'Savannah Wildlife Tent',
 'Bespoke high-ceiling canvas-constructed suite featuring mosquito netting, private stargazing telescope, and automated environmental fans.',
 32000, 2, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600', true, 5);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(14, '502', 'Cheetah Ridge Cottage',
 'Private cottage constructed from sustainable local timber. Features a massive wildlife viewing deck, private outdoor stone bath, and whiskey bar.',
 38500, 3, 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600', true, 5);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(15, '503', 'Elephant Oasis Villa',
 'Luxurious villa situated next to a natural watering hole. Enjoy watching elephants from your private elevated plunge pool and deck.',
 49000, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600', true, 5);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(16, '504', 'Sunset Acacia Lodge',
 'Elegant suite offering panoramic savannah vistas, custom suspended fireplaces, and floor-to-ceiling retractable screens.',
 42000, 2, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600', true, 5);

INSERT INTO rooms (id, number, type, description, price, max_guests, image_url, is_available, hotel_id) VALUES
(17, 'L1', 'Leopard Lookout Treehouse',
 'Elevated 20 feet above the forest canopy. Complete with private suspended rope bridges, panoramic viewing telescopes, and dedicated private butler service.',
 65000, 2, 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600', true, 5);

-- =====================================================
-- ROOM AMENITIES
-- =====================================================

-- Bali Room 101
INSERT INTO room_amenities (room_id, amenities) VALUES (1, 'Private Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (1, 'Lagoon Access');
INSERT INTO room_amenities (room_id, amenities) VALUES (1, 'Outdoor Shower');
INSERT INTO room_amenities (room_id, amenities) VALUES (1, 'Butler Service');

-- Bali Room 102
INSERT INTO room_amenities (room_id, amenities) VALUES (2, 'Ocean View');
INSERT INTO room_amenities (room_id, amenities) VALUES (2, 'Sunset Jacuzzi');
INSERT INTO room_amenities (room_id, amenities) VALUES (2, 'Spacious Balcony');
INSERT INTO room_amenities (room_id, amenities) VALUES (2, 'Wine Cooler');

-- Bali Room P1
INSERT INTO room_amenities (room_id, amenities) VALUES (3, 'Rooftop Infinity Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (3, 'Rooftop Lounge');
INSERT INTO room_amenities (room_id, amenities) VALUES (3, 'Private Chef');
INSERT INTO room_amenities (room_id, amenities) VALUES (3, '24/7 Butler');

-- Swiss Room 301
INSERT INTO room_amenities (room_id, amenities) VALUES (4, 'Fireplace');
INSERT INTO room_amenities (room_id, amenities) VALUES (4, 'Mountain View');
INSERT INTO room_amenities (room_id, amenities) VALUES (4, 'Ski Storage');
INSERT INTO room_amenities (room_id, amenities) VALUES (4, 'Heated Floors');

-- Swiss Room 302
INSERT INTO room_amenities (room_id, amenities) VALUES (5, 'Constellation Dome');
INSERT INTO room_amenities (room_id, amenities) VALUES (5, 'Copper Tub');
INSERT INTO room_amenities (room_id, amenities) VALUES (5, 'Heated Outdoor Balcony');
INSERT INTO room_amenities (room_id, amenities) VALUES (5, 'Mini Bar');

-- Tokyo Room 4201
INSERT INTO room_amenities (room_id, amenities) VALUES (6, 'Cypress Bath');
INSERT INTO room_amenities (room_id, amenities) VALUES (6, 'Voice Control');
INSERT INTO room_amenities (room_id, amenities) VALUES (6, 'Smart Projector');
INSERT INTO room_amenities (room_id, amenities) VALUES (6, 'Modular Workspace');

-- Tokyo Room 4202
INSERT INTO room_amenities (room_id, amenities) VALUES (7, 'Private Zen Garden');
INSERT INTO room_amenities (room_id, amenities) VALUES (7, 'Tatami Tea Room');
INSERT INTO room_amenities (room_id, amenities) VALUES (7, 'Premium Whiskey Cellar');
INSERT INTO room_amenities (room_id, amenities) VALUES (7, 'Panoramic Sky Views');

-- Santorini Room 401
INSERT INTO room_amenities (room_id, amenities) VALUES (8, 'Private Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (8, 'Cave Arch');
INSERT INTO room_amenities (room_id, amenities) VALUES (8, 'Caldera View');
INSERT INTO room_amenities (room_id, amenities) VALUES (8, 'Mini Bar');

-- Santorini Room 402
INSERT INTO room_amenities (room_id, amenities) VALUES (9, 'Heated Infinity Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (9, 'Smart Sound System');
INSERT INTO room_amenities (room_id, amenities) VALUES (9, 'Sunset Deck');

-- Santorini Room 403
INSERT INTO room_amenities (room_id, amenities) VALUES (10, '360 Ocean View');
INSERT INTO room_amenities (room_id, amenities) VALUES (10, 'Stargazing Balcony');
INSERT INTO room_amenities (room_id, amenities) VALUES (10, 'Stone Bath');

-- Santorini Room C1
INSERT INTO room_amenities (room_id, amenities) VALUES (11, 'Plunge Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (11, 'Cave Lounge');
INSERT INTO room_amenities (room_id, amenities) VALUES (11, 'Intelligent Lighting');

-- Santorini Room C2
INSERT INTO room_amenities (room_id, amenities) VALUES (12, 'Private Jacuzzi');
INSERT INTO room_amenities (room_id, amenities) VALUES (12, '8K Projector');
INSERT INTO room_amenities (room_id, amenities) VALUES (12, '24/7 Butler');

-- Serengeti Room 501
INSERT INTO room_amenities (room_id, amenities) VALUES (13, 'Wildlife View');
INSERT INTO room_amenities (room_id, amenities) VALUES (13, 'Stargazing Telescope');
INSERT INTO room_amenities (room_id, amenities) VALUES (13, 'Outdoor Bath');

-- Serengeti Room 502
INSERT INTO room_amenities (room_id, amenities) VALUES (14, 'Viewing Deck');
INSERT INTO room_amenities (room_id, amenities) VALUES (14, 'Outdoor Stone Bath');
INSERT INTO room_amenities (room_id, amenities) VALUES (14, 'Whiskey Bar');

-- Serengeti Room 503
INSERT INTO room_amenities (room_id, amenities) VALUES (15, 'Private Plunge Pool');
INSERT INTO room_amenities (room_id, amenities) VALUES (15, 'Watering Hole View');
INSERT INTO room_amenities (room_id, amenities) VALUES (15, 'Mini Bar');

-- Serengeti Room 504
INSERT INTO room_amenities (room_id, amenities) VALUES (16, 'Retractable Screens');
INSERT INTO room_amenities (room_id, amenities) VALUES (16, 'Acacia View');
INSERT INTO room_amenities (room_id, amenities) VALUES (16, 'Suspended Fireplace');

-- Serengeti Room L1
INSERT INTO room_amenities (room_id, amenities) VALUES (17, 'Canopy Views');
INSERT INTO room_amenities (room_id, amenities) VALUES (17, 'Rope Bridges');
INSERT INTO room_amenities (room_id, amenities) VALUES (17, 'Private Butler');

-- =====================================================
-- SAMPLE USERS
-- =====================================================

INSERT INTO users (id, email, password, full_name, role, loyalty_points, loyalty_tier) VALUES
(1, 'guest@aurahaven.com', 'guest123', 'Sarah Jenkins', 'GUEST', 3400, 'Platinum');

INSERT INTO users (id, email, password, full_name, role, loyalty_points, loyalty_tier) VALUES
(2, 'admin@aurahaven.com', 'admin123', 'Michael Vance', 'ADMIN', 0, 'Gold');
