export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: string;
  rating: string;
  posterUrl: string;
  showTimes: string[];
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "A thief who enters the dreams of others to steal their secrets gets a chance at redemption in one last job.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: "2h 28m",
    rating: "PG-13",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    showTimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: ["Drama"],
    duration: "2h 22m",
    rating: "R",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    showTimes: ["11:30 AM", "3:00 PM", "6:30 PM", "9:45 PM"]
  },
  {
    id: "3",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 32m",
    rating: "PG-13",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    showTimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
  },
  {
    id: "4",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    duration: "2h 34m",
    rating: "R",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    showTimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:15 PM"]
  },
  {
    id: "5",
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "3h 1m",
    rating: "PG-13",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    showTimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
  },
  {
    id: "6",
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    genre: ["Comedy", "Drama", "Thriller"],
    duration: "2h 12m", 
    rating: "R",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    showTimes: ["1:00 PM", "4:30 PM", "8:00 PM"]
  }
]; 