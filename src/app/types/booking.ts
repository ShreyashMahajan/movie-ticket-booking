export interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected?: boolean;
}

export interface BookingDetails {
  movieId: string;
  showTime: string;
  selectedSeats: Seat[];
  totalPrice: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  paymentStatus?: 'pending' | 'completed';
  bookingId?: string;
}

export const generateSeatLayout = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const seats: Seat[] = [];
  
  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Make some seats randomly unavailable
      const isAvailable = Math.random() > 0.2;
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        isAvailable
      });
    }
  });
  
  return seats;
};

export const calculateTotalPrice = (selectedSeats: Seat[]): number => {
  // Base price per seat
  const basePrice = 10;
  
  // Premium rows (front rows) cost more
  return selectedSeats.reduce((total, seat) => {
    // Premium rows (A-C) cost more
    const isPremium = ['A', 'B', 'C'].includes(seat.row);
    return total + (isPremium ? basePrice + 5 : basePrice);
  }, 0);
}; 