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

  const handleLogout = () => {
      console.log("Logging out...");
      onLogoutSuccess(); // Call parent function on logout
      navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLoginFailure}
          render={({ onClick }) => (
            <button onClick={onClick}>Login with Google</button>
          )}
        />
      )}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLoginSuccess = (response) => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    console.log("Logout Success");
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
