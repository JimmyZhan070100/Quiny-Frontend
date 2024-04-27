import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import URLShortenerForm from "./URLShortenerForm";
import "./App.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Now it's inside a component that is a child of <Router>

  const handleGoogleLogin = (response) => {
    console.log(response);
    navigate("/"); // Navigate to the homepage on successful login
  };

  const handleGoogleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Add Cliend ID in .env file
      buttonText="Login with Google"
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="brand">
            <Link to="/" className="home-link">
              <h1>Quiny</h1>
            </Link>
          </div>
          <nav className="navigation">
            <LoginButton /> {/* Use the new LoginButton component */}
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
