import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfflinePage = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      // Automatically go back if possible, otherwise to "/"
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎵 You're {!o"Offline"}</h1>
      <p>
        No internet connection. But you can still listen to songs you've already
        played.
      </p>
      <p>Try reconnecting to see all content.</p>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleRefresh} style={buttonStyle}>
          🔄 Refresh
        </button>
        <button
          onClick={handleBack}
          style={{ ...buttonStyle, marginLeft: "1rem" }}
        >
          ⬅️ Back
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#333",
  color: "white",
};

export default OfflinePage;
