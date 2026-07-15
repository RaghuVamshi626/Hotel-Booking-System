export const initialHotels = [
  {
    id: "resort_bali",
    name: "The Grand Oasis Resort & Spa",
    location: "Bali, Indonesia",
    rating: 4.9,
    description:
      "An idyllic tropical sanctuary nestled along the pristine shorelines of Nusa Dua. Offering fully integrated automated pool villas, private beaches, Michelin-starred wellness cuisines, and ancient sound-healing therapies.",
    basePrice: 26500,
    amenities: [
      "Spa",
      "Pool",
      "Private Beach",
      "Michelin Restaurant",
      "Valet Parking",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200",
    rooms: [
      {
        id: "room_bali_1",
        number: "101",
        type: "Grand Lagoon Villa",
        description:
          "Immerse yourself in lush greenery with private walk-in lagoon access, a private freshwater pool, automated blinds, and our signature rainfall shower garden.",
        price: 26500,
        maxGuests: 2,
        amenities: [
          "Private Pool",
          "Lagoon Access",
          "Outdoor Shower",
          "Butler Service",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_bali_2",
        number: "102",
        type: "Deluxe Ocean Suite",
        description:
          "Breathtaking 180-degree ocean views framed by floor-to-ceiling glass. Features a massive marble deck, private sunset jacuzzi, and intelligent ambient lighting.",
        price: 39500,
        maxGuests: 3,
        amenities: [
          "Ocean View",
          "Sunset Jacuzzi",
          "Spacious Balcony",
          "Wine Cooler",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_bali_3",
        number: "P1",
        type: "Presidential Beachfront Penthouse",
        description:
          "Our crown jewel. Spanning 2,500 sq ft of indoor-outdoor luxury, complete with a private infinity rooftop pool, full chef kitchen, and private elevator access.",
        price: 78500,
        maxGuests: 6,
        amenities: [
          "Rooftop Infinity Pool",
          "Rooftop Lounge",
          "Private Chef",
          "24/7 Butler",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: "rev1",
        guestName: "Vamshi Raghu",
        rating: 5,
        comment:
          "Absolutely mesmerizing! The automated lagoon villa felt like a paradise built in the future. The food was spectacular.",
        date: "2026-07-10",
      },
      {
        id: "rev2",
        guestName: "Emma Watson",
        rating: 4.8,
        comment:
          "Top-tier services. The rooftop penthouse pool is completely unmatched. Will return next season.",
        date: "2026-06-25",
      },
    ],
  },
  {
    id: "resort_swiss",
    name: "Aura Chalet Skyline",
    location: "Zermatt, Switzerland",
    rating: 4.8,
    description:
      "An architectural ski-in, ski-out wonder situated in the snow-capped elevations of Zermatt. Featuring thermal pools, glass dome stargazing ceilings, and indoor fireplaces controlled via modern app systems.",
    basePrice: 34500,
    amenities: [
      "Pool",
      "Fitness Center",
      "Private Beach",
      "Michelin Restaurant",
      "Valet Parking",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1200",
    rooms: [
      {
        id: "room_swiss_1",
        number: "301",
        type: "Alpine Vista Loft",
        description:
          "Elegant pine wood design featuring a custom suspended wood fireplace, majestic Matterhorn mountain vistas, and a private ski gear locker.",
        price: 34500,
        maxGuests: 2,
        amenities: [
          "Fireplace",
          "Mountain View",
          "Ski Storage",
          "Heated Floors",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_swiss_2",
        number: "302",
        type: "Glacier Panoramic Suite",
        description:
          "Stunning glass dome ceiling that allows you to gaze at Zermatt constellations from your custom king bed. Fitted with deep copper soaking tubs.",
        price: 48500,
        maxGuests: 4,
        amenities: [
          "Constellation Dome",
          "Copper Tub",
          "Heated Outdoor Balcony",
          "Mini Bar",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: "rev3",
        guestName: "Julianne Hough",
        rating: 4.7,
        comment:
          "Stargazing from the copper tub was a lifelong dream come true. Truly innovative heating solutions.",
        date: "2026-05-14",
      },
    ],
  },
  {
    id: "resort_tokyo",
    name: "The Urban Ritz Sanctuary",
    location: "Tokyo, Japan",
    rating: 4.95,
    description:
      "Sleek metropolitan luxury hovering high above the neon skyline of Tokyo. Boasting traditional Zen gardens inside sky lobbies, traditional teahouses, and fully robotic room delivery services.",
    basePrice: 41500,
    amenities: [
      "Michelin Restaurant",
      "Fitness Center",
      "Valet Parking",
      "High-Speed Wifi",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200",
    rooms: [
      {
        id: "room_tokyo_1",
        number: "4201",
        type: "Skyline Deluxe Studio",
        description:
          "Gaze down at Shinjuku skylines. Fitted with automated smart home systems, voice control, premium Japanese cypress baths, and modular workspace layouts.",
        price: 41500,
        maxGuests: 2,
        amenities: [
          "Cypress Bath",
          "Voice Control",
          "Smart Projector",
          "Modular Workspace",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_tokyo_2",
        number: "4202",
        type: "Zen Garden Presidential Suite",
        description:
          "A masterpiece combining authentic tatami mats and stone gravel gardens with modern 8K screens, custom whiskey cellars, and panoramic dual-exposure skylines.",
        price: 99500,
        maxGuests: 4,
        amenities: [
          "Private Zen Garden",
          "Tatami Tea Room",
          "Premium Whiskey Cellar",
          "Panoramic Sky Views",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: "rev4",
        guestName: "Narihiro Sato",
        rating: 5,
        comment:
          "Perfect execution of classic heritage and innovative automated luxury. Incredible stay.",
        date: "2026-07-02",
      },
    ],
  },
  {
    id: "resort_santorini",
    name: "Aura Mediterranean Palace",
    location: "Santorini, Greece",
    rating: 4.9,
    description:
      "A breathtaking cliffside sanctuary overlooking the deep blue Aegean Sea. Featuring white-washed cave villas, private infinity pools, world-class thermal spas, and sunset wine tastings.",
    basePrice: 29500,
    amenities: [
      "Spa",
      "Pool",
      "Fitness Center",
      "Michelin Restaurant",
      "Valet Parking",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200",
    rooms: [
      {
        id: "room_santorini_1",
        number: "401",
        type: "Deluxe Aegean Suite",
        description:
          "Elegant suite overlooking caldera vistas, featuring a private cave pool, traditional Cycladic arches, and automated temperature controls.",
        price: 29500,
        maxGuests: 2,
        amenities: ["Private Pool", "Cave Arch", "Caldera View", "Mini Bar"],
        imageUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_santorini_2",
        number: "402",
        type: "Caldera Pool Villa",
        description:
          "A large private villa perched on Oia cliffs. Complete with a heated infinity pool, automated surround-sound audio systems, and local organic wines.",
        price: 45000,
        maxGuests: 3,
        amenities: ["Heated Infinity Pool", "Smart Sound System", "Sunset Deck"],
        imageUrl:
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_santorini_3",
        number: "403",
        type: "Panoramic Cliff Studio",
        description:
          "Sleek studio layout offering 360-degree sunset ocean views, private stargazing balcony, and minimalist stone-crafted bathroom.",
        price: 32000,
        maxGuests: 2,
        amenities: ["360 Ocean View", "Stargazing Balcony", "Stone Bath"],
        imageUrl:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_santorini_4",
        number: "C1",
        type: "Honeymoon Luxury Cave",
        description:
          "An authentic white stone cave suite designed for romance. Featuring a grand indoor-outdoor plunge pool and intelligent wellness lighting.",
        price: 55000,
        maxGuests: 2,
        amenities: ["Plunge Pool", "Cave Lounge", "Intelligent Lighting"],
        imageUrl:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_santorini_5",
        number: "C2",
        type: "Royal Blue Sea Suite",
        description:
          "Our largest caldera suite. Features a massive marble deck, private sunset jacuzzi, 8K projector screens, and 24/7 butler service.",
        price: 62000,
        maxGuests: 4,
        amenities: ["Private Jacuzzi", "8K Projector", "24/7 Butler"],
        imageUrl:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: "rev5",
        guestName: "Narihiro Sato",
        rating: 5,
        comment:
          "The cave plunge pool overlooking the caldera is paradise. Service was exceptionally warm.",
        date: "2026-07-12",
      },
    ],
  },
  {
    id: "resort_serengeti",
    name: "The Safari Lodge Oasis",
    location: "Serengeti, Tanzania",
    rating: 4.85,
    description:
      "An ultra-luxurious eco-friendly haven nestled in the heart of the Serengeti wild. Featuring high-ceiling canvas suites, private wildlife viewing decks, elevated plunge pools, and open-air fine dining.",
    basePrice: 32000,
    amenities: [
      "Spa",
      "Pool",
      "Fitness Center",
      "Michelin Restaurant",
      "Valet Parking",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200",
    rooms: [
      {
        id: "room_serengeti_1",
        number: "501",
        type: "Savannah Wildlife Tent",
        description:
          "Bespoke high-ceiling canvas-constructed suite featuring mosquito netting, private stargazing telescope, and automated environmental fans.",
        price: 32000,
        maxGuests: 2,
        amenities: ["Wildlife View", "Stargazing Telescope", "Outdoor Bath"],
        imageUrl:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_serengeti_2",
        number: "502",
        type: "Cheetah Ridge Cottage",
        description:
          "Private cottage constructed from sustainable local timber. Features a massive wildlife viewing deck, private outdoor stone bath, and whiskey bar.",
        price: 38500,
        maxGuests: 3,
        amenities: ["Viewing Deck", "Outdoor Stone Bath", "Whiskey Bar"],
        imageUrl:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_serengeti_3",
        number: "503",
        type: "Elephant Oasis Villa",
        description:
          "Luxurious villa situated next to a natural watering hole. Enjoy watching elephants from your private elevated plunge pool and deck.",
        price: 49000,
        maxGuests: 4,
        amenities: ["Private Plunge Pool", "Watering Hole View", "Mini Bar"],
        imageUrl:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_serengeti_4",
        number: "504",
        type: "Sunset Acacia Lodge",
        description:
          "Elegant suite offering panoramic savannah vistas, custom suspended fireplaces, and floor-to-ceiling retractable screens.",
        price: 42000,
        maxGuests: 2,
        amenities: ["Retractable Screens", "Acacia View", "Suspended Fireplace"],
        imageUrl:
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
      {
        id: "room_serengeti_5",
        number: "L1",
        type: "Leopard Lookout Treehouse",
        description:
          "Elevated 20 feet above the forest canopy. Complete with private suspended rope bridges, panoramic viewing telescopes, and dedicated private butler service.",
        price: 65000,
        maxGuests: 2,
        amenities: ["Canopy Views", "Rope Bridges", "Private Butler"],
        imageUrl:
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
        isAvailable: true,
      },
    ],
    reviews: [
      {
        id: "rev6",
        guestName: "Emma Watson",
        rating: 4.9,
        comment:
          "Sleeping in the Leopard Lookout treehouse was magical. Heard lions roaring under the starlight.",
        date: "2026-07-05",
      },
    ],
  },
];
