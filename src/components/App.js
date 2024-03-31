import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import URLShortenerForm from "./URLShortenerForm";
import "./App.css";
import GoogleLogin from "react-google-login";

function App() {
  const handleGoogleLogin = (response) => {
    // Handle the successful Google login response
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle the Google login failure
    console.error(error);
  };

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
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
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
