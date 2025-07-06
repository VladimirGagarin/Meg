import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css"

export default function LyricsCard({ lyricText}) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect for lyrics
  useEffect(() => {
    if (!lyricText) return;

    setDisplayText("");
    setCharIndex(0);

    if (lyricText.length > 0) {
      const timer = setInterval(() => {
        setDisplayText((prev) => prev + lyricText[charIndex]);
        setCharIndex((prev) => prev + 1);

        if (charIndex >= lyricText.length - 1) {
          clearInterval(timer);
        }
      }, 30); // Adjust typing speed here

      return () => clearInterval(timer);
    }
  }, [lyricText, charIndex]);

  return (
    <div className={`lyrics-card ${isActive ? "active" : ""}`}>
      <div className="lyrics-text">
        {displayText || lyricText}
        <span className="cursor">|</span>
      </div>
    </div>
  );
}

LyricsCard.propTypes = {
  lyricText: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

LyricsCard.defaultProps = {
  isActive: false,
};
