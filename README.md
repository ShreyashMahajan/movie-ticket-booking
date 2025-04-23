# Movie Ticket Booking System

A simple movie ticket booking application built with Next.js and TypeScript. This application allows users to browse movies, select showtimes, choose seats, and complete bookings.

## Features

- Browse available movies
- View movie details including description, rating, and duration
- Select showtimes for movies
- Interactive seat selection
- Booking summary with pricing
- Booking confirmation with QR code

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Others**: QR Code generation

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url/movie-ticket-booking.git
   cd movie-ticket-booking
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/components`: Reusable React components
- `src/app/context`: React Context for state management
- `src/app/data`: Mock data for movies
- `src/app/types`: TypeScript types and interfaces
- `src/app/movies/[id]`: Movie details and booking page
- `src/app/bookings/[id]`: Booking confirmation page

## Booking Flow

1. User browses movies on the homepage
2. User selects a movie to view details
3. User chooses a showtime for the selected movie
4. User selects seats in the theater
5. User provides contact information and completes payment
6. User receives booking confirmation with QR code

## License

This project is open source and available under the [MIT License](LICENSE).
