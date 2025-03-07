import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerified: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Redirect after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      navigate("/login"); // Redirects to the Login route
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="message-container">
      <h1>Email Verified</h1>
      <h2>Your email has been verified</h2>
      <p>You will be redirected to the login page shortly...</p>
    </div>
  );
};

export default EmailVerified;

// window.onload = () => {
//     const messageElement = document.getElementById("email-verified-message");

//     if (messageElement) {
//         // Display the message once the page is loaded
//         messageElement.textContent = "Email Verified";
//     }
// };
