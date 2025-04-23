'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { BookingDetails, Seat, calculateTotalPrice } from '../types/booking';

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setMovieAndTime: (movieId: string, showTime: string) => void;
  selectSeat: (seat: Seat) => void;
  deselectSeat: (seatId: string) => void;
  updateCustomerInfo: (name: string, email: string, phone: string) => void;
  completeBooking: () => string;
  resetBooking: () => void;
}

const initialState: BookingDetails = {
  movieId: '',
  showTime: '',
  selectedSeats: [],
  totalPrice: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const setMovieAndTime = (movieId: string, showTime: string) => {
    setBookingDetails({
      movieId,
      showTime,
      selectedSeats: [],
      totalPrice: 0,
    });
  };

  const selectSeat = (seat: Seat) => {
    if (!bookingDetails) return;
    
    const updatedSeats = [...bookingDetails.selectedSeats, { ...seat, isSelected: true }];
    setBookingDetails({
      ...bookingDetails,
      selectedSeats: updatedSeats,
      totalPrice: calculateTotalPrice(updatedSeats),
    });
  };

  const deselectSeat = (seatId: string) => {
    if (!bookingDetails) return;
    
    const updatedSeats = bookingDetails.selectedSeats.filter(seat => seat.id !== seatId);
    setBookingDetails({
      ...bookingDetails,
      selectedSeats: updatedSeats,
      totalPrice: calculateTotalPrice(updatedSeats),
    });
  };

  const updateCustomerInfo = (name: string, email: string, phone: string) => {
    if (!bookingDetails) return;
    
    setBookingDetails({
      ...bookingDetails,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    });
  };

  const completeBooking = () => {
    if (!bookingDetails) return '';
    
    // Generate a random booking ID
    const bookingId = `BK${Math.floor(100000 + Math.random() * 900000)}`;
    
    setBookingDetails({
      ...bookingDetails,
      paymentStatus: 'completed',
      bookingId,
    });
    
    return bookingId;
  };

  const resetBooking = () => {
    setBookingDetails(null);
  };

  const value = {
    bookingDetails,
    setMovieAndTime,
    selectSeat,
    deselectSeat,
    updateCustomerInfo,
    completeBooking,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}; 