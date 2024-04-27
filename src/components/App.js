import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import URLShortenerForm from "./URLShortenerForm";
import "./App.css";
import { GoogleLogin, useGoogleOneTapLogin, googleLogout } from '@react-oauth/google';


const LoginButton = ({ isLoggedIn, onLoginSuccess, onLogoutSuccess }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = (response) => {
    console.log("Login Success:", response);
    onLoginSuccess(response); // Lift up the state
    navigate("/");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      render={({ onClick }) => (
        <button onClick={onClick}>
            {isLoggedIn ? "Logout" : "Login with Google"}
        </button>
      )}
      useOneTap
    />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLoginSuccess = (response) => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success:", response);
    googleLogout();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="brand">
          <Link to="/" className="home-link">
            <h1>Quiny</h1>
          </Link>
        </div>
        <nav className="navigation">
          <LoginButton
            isLoggedIn={isLoggedIn}
            onLoginSuccess={handleLoginSuccess}
            onLogoutSuccess={handleLogoutSuccess}
          />
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<URLShortenerForm />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
