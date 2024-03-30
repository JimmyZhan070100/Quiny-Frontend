import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import URLShortenerForm from "./URLShortenerForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="brand">
            <a href="/" className="home-link">
              <h1>Quiny</h1>
            </a>
          </div>
          <nav className="navigation">
            <button className="login">Login</button>
            <button className="register">Register Now</button>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<URLShortenerForm />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
