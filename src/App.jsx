import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import ViewBooking from "./components/ViewBooking";
import UpdateBooking from "./components/UpdateBooking";
import BookingComponent from "./components/BookingComponent";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation Bar */}
        <nav
          data-testid="navbar"
          className="navbar navbar-expand-lg p-2 navbar-dark bg-primary"
        >
          <span className="navbar-brand">Floating Restaurant</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                data-testid="bookBuffet-link"
                to="/bookBuffet"
              >
                Book Buffet
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                data-testid="viewBookings-link"
                to="/viewBookings"
              >
                View Bookings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Both "/" and "/bookBuffet" will load BookingComponent */}
          <Route path="/" element={<BookingComponent />} />
          <Route path="/bookBuffet" element={<BookingComponent />} />

          {/* Other pages */}
          <Route path="/viewBookings" element={<ViewBooking />} />
          <Route path="/updateBooking/:id" element={<UpdateBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
