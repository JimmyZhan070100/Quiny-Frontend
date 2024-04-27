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
import GoogleLogin from "react-google-login";
import GoogleLogout from "react-google-login";

const LoginButton = ({ onLoginSuccess, onLogoutSuccess }) => {
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
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={"single_host_origin"}
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
          {isLoggedIn ? (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogoutSuccess}
            />
          ) : (
            <LoginButton
              onLoginSuccess={handleLoginSuccess}
              onLogoutSuccess={handleLogoutSuccess}
            />
          )}
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
