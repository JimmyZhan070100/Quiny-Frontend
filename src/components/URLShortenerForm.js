/**
 * The URLShortenerForm component in React allows users to input URLs, store them in a list, and
 * display the shortened URLs.
 * @returns The `URLShortenerForm` component is being returned. It consists of a form where users can
 * enter a URL, submit it, and see a list of saved URLs below the form. The component also includes a
 * title, a description, an input field for entering URLs, a submit button for submitting the URL, and
 * a list to display the saved URLs.
 */
import React, { useState } from "react";
import "./URLShortenerForm.css";

const URLShortenerForm = () => {
  const [url, setUrl] = useState(""); // For the input field
  const [urls, setUrls] = useState([]); // For storing the list of URLs

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the url is not empty before adding to the list
    if (url.trim() !== "") {
      // Add the current URL to the list
      setUrls((prevUrls) => [...prevUrls, url]);
      // Clear the input field after submission
      setUrl("");
    } else {
      console.log("Please enter a URL before submitting.");
    }
  };

  return (
    <div className="url-shortener-form-container">
      <h2 className="h2-text">Quick Tiny URL</h2>
      <p className="p-text">We help shorten your urls</p>
      <form onSubmit={handleSubmit} className="url-shortener-form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter link here"
          className="url-input"
        />
        <button type="submit" className="submit-button">
          Shorten Now
        </button>
      </form>
      <div className="url-list-container">
        <ul>
          {urls.map((savedUrl, index) => (
            <li key={index}>{savedUrl}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default URLShortenerForm;
