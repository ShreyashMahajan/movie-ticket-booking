'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { Seat, generateSeatLayout } from '../types/booking';

export default function SeatSelector() {
  const [seatLayout, setSeatLayout] = useState<Seat[]>([]);
  const { bookingDetails, selectSeat, deselectSeat } = useBooking();
  
  useEffect(() => {
    // Generate a seat layout
    setSeatLayout(generateSeatLayout());
  }, []);
  
  const handleSeatClick = (seat: Seat) => {
    if (!seat.isAvailable) return;
    
    const isSelected = bookingDetails?.selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      deselectSeat(seat.id);
    } else {
      selectSeat(seat);
    }
  };
  
  const isSelected = (seatId: string) => {
    return bookingDetails?.selectedSeats.some(seat => seat.id === seatId) ?? false;
  };
  
  // Group seats by row
  const seatsByRow = seatLayout.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
  
  return (
    <div className="seat-selector">
      <div className="screen-container">
        <div className="screen"></div>
        <p className="screen-label">SCREEN</p>
        
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat-available-icon"></div>
            <span className="legend-text">Available</span>
          </div>
          <div className="legend-item">
            <div className="seat-selected-icon"></div>
            <span className="legend-text">Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat-unavailable-icon"></div>
            <span className="legend-text">Unavailable</span>
          </div>
        </div>
      </div>
      
      <div className="seating-layout">
        {Object.entries(seatsByRow).map(([row, seats]) => (
          <div key={row} className="seat-row">
            <div className="row-label">
              {row}
            </div>
            {seats.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                disabled={!seat.isAvailable}
                className={`seat ${
                  isSelected(seat.id)
                    ? 'seat-selected'
                    : seat.isAvailable
                    ? 'seat-available'
                    : 'seat-unavailable'
                }`}
              >
                {seat.number}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 