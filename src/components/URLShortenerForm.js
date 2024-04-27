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
  const [copied, setCopied] = useState({}); // Object to track copied state of URLs

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

  const copyToClipboard = (urlToCopy, index) => {
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setCopied((prevCopied) => ({
          ...prevCopied,
          [index]: true, // Set copied state to true for the clicked URL
        }));
        // Set a timeout to reset the state after 3 seconds
        setTimeout(() => {
          setCopied((prevCopied) => ({
            ...prevCopied,
            [index]: false,
          }));
        }, 3000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  // Function to generate the QR code URL
  const generateQRCodeURL = (text) => {
    const encodedText = encodeURIComponent(text); // URL-encode the text
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=100x100`;
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
            <li key={index} className="url-list-item">
              <span>{`${index + 1}. ${savedUrl}`}</span>
              <button
                onClick={() => copyToClipboard(savedUrl, index)}
                className={`copy-button ${copied[index] ? "copied" : ""}`}
              >
                {copied[index] ? "Copied" : "Copy"}
              </button>
              {/* QR Code Image */}
              <img
                src={generateQRCodeURL(savedUrl)}
                alt="QR Code"
                className="qr-code-image"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default URLShortenerForm;
