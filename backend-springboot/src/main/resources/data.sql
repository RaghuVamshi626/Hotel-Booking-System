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

-- =====================================================
-- SAMPLE USERS
-- =====================================================

INSERT INTO users (id, email, password, full_name, role, loyalty_points, loyalty_tier) VALUES
(1, 'guest@aurahaven.com', 'guest123', 'Sarah Jenkins', 'GUEST', 3400, 'Platinum');

INSERT INTO users (id, email, password, full_name, role, loyalty_points, loyalty_tier) VALUES
(2, 'admin@aurahaven.com', 'admin123', 'Michael Vance', 'ADMIN', 0, 'Gold');
