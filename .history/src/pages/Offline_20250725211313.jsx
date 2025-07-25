import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRWithLogo } from "../components/Qrcode";

const quotes = [
  "🌱 Even offline, your soul is still online. Take a deep breath.",
  "📴 Disconnected? Reconnect with yourself for a moment.",
  "🧘‍♂️ A perfect time to reflect. Music waits patiently.",
  "📚 Hack: Offline mode is your distraction-free zone.",
  "✨ No signal, no noise — just you and the memories.",
  "🎧 Tip: Songs you’ve played are still with you. Play them again.",
  "💡 Use this time to journal, rest, or simply listen.",
  "🕊️ Calm moments come when the world slows down.",
  "⚡ Creativity doesn’t need WiFi. Let your mind roam.",
  "🌌 A starry mind shines brightest in digital silence.",
];

const OfflinePage = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const handleOnline = () => {
      setOnline(true);
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    };

    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const handleRefresh = () => window.location.reload();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎵 You're {online ? "Online" : "Offline"}</h1>
      <p>
        Try reconnecting to see all content. Just making sure you
        <a
          href="https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.1/application-490c4c6a-8b27-4c78-a6c7-884413dabbfb.apk"
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "DDF700" }}
        >
          Downloaded the App
        </a>
      </p>

      <blockquote style={quoteStyle}>
        <em>{quote}</em>
      </blockquote>

      <div
        style={{
          marginTop: "4rem",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: "600",
            fontSize: "2.2rem",
            letterSpacing: "1px",
            color: "#333",
          }}
        >
          The Eternal Whisper
        </h2>
        <div style={{ marginBottom: "2rem", width: "100%", textAlign: "center" }}>
          <QRWithLogo />
          <p>Scan the QR code to download app first.</p>
        </div>

        <div
          style={{
            fontStyle: "italic",
            lineHeight: "2",
            color: "#555",
            fontSize: "1.1rem",
            borderLeft: "3px solid #d4af37",
            paddingLeft: "2rem",
            marginTop: "1.5rem",
          }}
        >
          <p>
            Beneath the moon's argent sigh,
            <br />
            Your name becomes my silent cry —<br />
            A psalm woven in midnight air,
            <br />
            The breath between each whispered prayer.
          </p>

          <p style={{ marginTop: "2rem" }}>
            When all the digital lights decay,
            <br />
            Your voice still guides the pilgrim's way —<br />
            The eternal rose beyond compare,
            <br />
            Magdalene... our answered prayer.
          </p>

          <p style={{ marginTop: "2rem" }}>
            A flame you shield from wind and rain,
            <br />
            Defender of the dreamer’s pain —<br />
            Through dusk and dawn, through doubt and fear,
            <br />
            You keep the embered song sincere.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "2rem", marginBottom:"2rem" }}>
        <button onClick={handleRefresh} style={buttonStyle}>
          Refresh
        </button>
        <button
          onClick={handleBack}
          style={{ ...buttonStyle, marginLeft: "1rem" }}
        >
          Back
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

const quoteStyle = {
  fontSize: "1rem",
  marginTop: "1.5rem",
  color: "#212121",
  maxWidth: "500px",
  margin: "1.5rem auto",
  fontStyle: "italic",
};

export default OfflinePage;
