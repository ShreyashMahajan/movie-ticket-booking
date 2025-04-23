import "./globals.css";
import { Inter } from "next/font/google";
import { BookingProvider } from "./context/BookingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Ticket Booking",
  description: "Book tickets for your favorite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          <div className="layout-container">
            <header className="site-header">
              <div className="container">
                <h1 className="site-title">CinemaTickets</h1>
                <nav>
                  <ul className="nav-menu">
                    <li>
                      <a href="/" className="nav-link">Home</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">Movies</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">Theaters</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            <main className="main-content">
              {children}
            </main>
            <footer className="site-footer">
              <div className="container footer-content">
                <p>© {new Date().getFullYear()} CinemaTickets. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </BookingProvider>
      </body>
    </html>
  );
}
