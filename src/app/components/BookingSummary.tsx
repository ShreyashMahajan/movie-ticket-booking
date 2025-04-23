'use client';

import { useBooking } from '../context/BookingContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingSummary({ movieTitle }: { movieTitle: string }) {
  const router = useRouter();
  const { bookingDetails, updateCustomerInfo, completeBooking } = useBooking();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!bookingDetails) {
    return <div>No booking in progress</div>;
  }

  const handlePayment = () => {
    // Validate form
    if (!name || !email || !phone) {
      setFormSubmitted(true);
      return;
    }

    // Update customer info
    updateCustomerInfo(name, email, phone);
    
    // Complete booking and get booking ID
    const bookingId = completeBooking();
    
    // Navigate to confirmation page
    router.push(`/bookings/${bookingId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Movie:</span>
          <span className="font-medium">{movieTitle}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Show Time:</span>
          <span className="font-medium">{bookingDetails.showTime}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Seats:</span>
          <span className="font-medium">
            {bookingDetails.selectedSeats.map(seat => seat.id).join(', ')}
          </span>
        </div>
      </div>

      <div className="border-t border-b py-4 my-4">
        <div className="flex justify-between font-semibold">
          <span>Total Amount:</span>
          <span>${bookingDetails.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium mb-3">Contact Information</h4>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${formSubmitted && !name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          {formSubmitted && !name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${formSubmitted && !email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
          {formSubmitted && !email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${formSubmitted && !phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your phone number"
          />
          {formSubmitted && !phone && <p className="text-red-500 text-xs mt-1">Phone is required</p>}
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={bookingDetails.selectedSeats.length === 0}
        className={`w-full py-3 rounded-md font-medium text-center ${
          bookingDetails.selectedSeats.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        Proceed to Payment
      </button>
    </div>
  );
} 