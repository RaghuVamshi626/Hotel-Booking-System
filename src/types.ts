export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'GUEST' | 'ADMIN';
  loyaltyPoints: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  preferredBeverage?: string;
  preferredPillow?: string;
  preferredSoundscape?: string;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  description: string;
  price: number;
  maxGuests: number;
  amenities: string[];
  imageUrl: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  description: string;
  basePrice: number;
  amenities: string[];
  imageUrl: string;
  rooms: Room[];
  reviews: Review[];
}

export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'REFUNDED';
  addons: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
