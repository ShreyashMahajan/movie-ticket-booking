'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '../../context/BookingContext';
import { movies } from '../../data/movies';
import { Movie } from '../../data/movies';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';

export default function BookingConfirmation({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { bookingDetails, resetBooking } = useBooking();
  const [movie, setMovie] = useState<Movie | null>(null);
  const bookingId = params.id; // Access directly for now

  useEffect(() => {
    // Check if we have active booking details
    if (!bookingDetails || !bookingDetails.bookingId) {
      router.push('/');
      return;
    }

    // Check if the booking ID matches the URL param
    if (bookingDetails.bookingId !== bookingId) {
      router.push('/');
      return;
    }

    // Find the movie details
    const foundMovie = movies.find(m => m.id === bookingDetails.movieId);
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [bookingDetails, bookingId, router]);

  const handleBackToHome = () => {
    resetBooking();
    router.push('/');
  };

  if (!bookingDetails || !bookingDetails.bookingId || !movie) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="booking-confirmation">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h1 className="confirmation-title">Booking Confirmed!</h1>
          <p className="confirmation-subtitle">Your booking has been confirmed and tickets have been reserved.</p>
        </div>
        
        <div className="confirmation-body">
          <div className="movie-summary">
            <div>
              <h2 className="movie-summary-title">{movie.title}</h2>
              <p className="movie-summary-info">{movie.duration} • {movie.rating}</p>
            </div>
            <div className="movie-thumbnail">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div className="booking-details">
            <div className="booking-detail-item">
              <h3 className="detail-label">Booking ID</h3>
              <p className="detail-value">{bookingDetails.bookingId}</p>
            </div>
            <div className="booking-detail-item">
              <h3 className="detail-label">Show Time</h3>
              <p className="detail-value">{bookingDetails.showTime}</p>
            </div>
            <div className="booking-detail-item">
              <h3 className="detail-label">Seats</h3>
              <p className="detail-value">
                {bookingDetails.selectedSeats.map(seat => seat.id).join(', ')}
              </p>
            </div>
            <div className="booking-detail-item">
              <h3 className="detail-label">Total Amount</h3>
              <p className="detail-value">${bookingDetails.totalPrice.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="customer-info">
            <h3 className="detail-label">Customer Information</h3>
            <p><span className="info-label">Name:</span> {bookingDetails.customerName}</p>
            <p><span className="info-label">Email:</span> {bookingDetails.customerEmail}</p>
            <p><span className="info-label">Phone:</span> {bookingDetails.customerPhone}</p>
          </div>
          
          <div className="qr-code-container">
            <h3 className="detail-label">Scan at the theater</h3>
            <div className="qr-code">
              <QRCodeCanvas 
                value={`BOOKING:${bookingDetails.bookingId}`} 
                size={150} 
                level="H"
                fgColor="#000000"
              />
            </div>
            <p className="qr-info">Show this QR code at the ticket counter</p>
          </div>
          
          <div className="action-btn-container">
            <button 
              onClick={handleBackToHome}
              className="btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 