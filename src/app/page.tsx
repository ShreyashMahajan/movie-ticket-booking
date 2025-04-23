import { movies } from './data/movies';
import MovieCard from './components/MovieCard';

export default function Home() {
  return (
    <div>
      <section className="movies-section">
        <h1 className="section-title">Now Showing</h1>
        <p className="section-description">Book tickets for the latest movies</p>
        
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
