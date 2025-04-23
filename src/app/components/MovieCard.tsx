'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  
  const handleBookTicket = () => {
    router.push(`/movies/${movie.id}`);
  };
  
  return (
    <div className="movie-card">
      <div className="poster-container">
        <Image 
          src={movie.posterUrl} 
          alt={movie.title}
          fill
          style={{ objectFit: 'cover' }}
          className="movie-poster"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{movie.title}</h3>
          <span className="movie-rating">
            {movie.rating}
          </span>
        </div>
        <div className="movie-meta">
          <span>{movie.duration}</span>
          <span className="dot-separator">•</span>
          <span>{movie.genre.join(', ')}</span>
        </div>
        <p className="movie-description">{movie.description}</p>
        <div className="button-container">
          <button 
            onClick={handleBookTicket}
            className="btn-primary"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
} 