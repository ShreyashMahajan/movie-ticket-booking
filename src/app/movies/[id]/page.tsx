'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { movies } from '../../data/movies';
import { Movie } from '../../data/movies';
import { useBooking } from '../../context/BookingContext';
import SeatSelector from '../../components/SeatSelector';
import BookingSummary from '../../components/BookingSummary';

export default function MovieDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { setMovieAndTime, bookingDetails } = useBooking();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'showtime' | 'seats' | 'payment'>('showtime');
  const movieId = params.id; // Access directly for now

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === movieId);
    if (!foundMovie) {
      router.push('/');
      return;
    }
    setMovie(foundMovie);
  }, [movieId, router]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!movie || !selectedTime) return;
    
    if (step === 'showtime') {
      setMovieAndTime(movie.id, selectedTime);
      setStep('seats');
    } else if (step === 'seats') {
      if (bookingDetails?.selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
      }
      setStep('payment');
    }
  };

  if (!movie) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div>
      <button 
        onClick={() => router.push('/')}
        className="back-button"
      >
        <span>← Back to movies</span>
      </button>

      <div className="movie-detail-layout">
        <div className="movie-content">
          <div className="movie-header">
            <div className="movie-poster-container">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                className="movie-poster-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            <div className="movie-info-container">
              <h1 className="movie-title-large">{movie.title}</h1>
              <div className="movie-meta-info">
                <span className="movie-rating-badge">
                  {movie.rating}
                </span>
                <span className="meta-separator">•</span>
                <span className="movie-duration">{movie.duration}</span>
                <span className="meta-separator">•</span>
                <span className="movie-genres">{movie.genre.join(', ')}</span>
              </div>
              <p className="movie-description-full">{movie.description}</p>
            </div>
          </div>

          {step === 'showtime' && (
            <div className="showtime-selector">
              <h2 className="section-title">Select Showtime</h2>
              <div className="showtime-options">
                {movie.showTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`time-option ${
                      selectedTime === time
                        ? 'time-selected'
                        : ''
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'seats' && <SeatSelector />}
        </div>

        <div className="booking-sidebar">
          {step === 'payment' ? (
            <BookingSummary movieTitle={movie.title} />
          ) : (
            <div className="booking-summary-card">
              <h3 className="summary-title">
                {step === 'showtime' ? 'Booking Details' : 'Selected Seats'}
              </h3>
              
              {step === 'showtime' && (
                <div>
                  <p className="booking-instruction">
                    Please select a showtime to continue.
                  </p>
                </div>
              )}
              
              {step === 'seats' && bookingDetails && (
                <div>
                  <div className="booking-details">
                    <div className="booking-detail-row">
                      <span className="detail-label">Movie:</span>
                      <span className="detail-value">{movie.title}</span>
                    </div>
                    <div className="booking-detail-row">
                      <span className="detail-label">Show Time:</span>
                      <span className="detail-value">{bookingDetails.showTime}</span>
                    </div>
                    <div className="booking-detail-row">
                      <span className="detail-label">Selected Seats:</span>
                      <span className="detail-value">
                        {bookingDetails.selectedSeats.length > 0 
                          ? bookingDetails.selectedSeats.map(seat => seat.id).join(', ')
                          : 'None'}
                      </span>
                    </div>
                  </div>
                  
                  {bookingDetails.selectedSeats.length > 0 && (
                    <div className="booking-total">
                      <div className="total-row">
                        <span>Total Amount:</span>
                        <span>${bookingDetails.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={handleContinue}
                disabled={step === 'showtime' ? !selectedTime : (step === 'seats' && bookingDetails?.selectedSeats.length === 0)}
                className={`continue-button ${
                  (step === 'showtime' && !selectedTime) || (step === 'seats' && bookingDetails?.selectedSeats.length === 0)
                    ? 'button-disabled'
                    : 'btn-primary'
                }`}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 