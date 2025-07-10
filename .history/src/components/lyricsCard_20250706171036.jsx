import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";

export default function LyricsCard({ lyricText }) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!lyricText) return;

    setDisplayText("");
    setCharIndex(0);

    const timer = setInterval(() => {
      setCharIndex((prevIndex) => {
        if (prevIndex < lyricText.length) {
          setDisplayText((prev) => prev + lyricText[prevIndex]);
          return prevIndex + 1;
        } else {
          clearInterval(timer);
          return prevIndex;
        }
      });
    }, 30); // typing speed

    return () => clearInterval(timer);
  }, [lyricText]);

  return (
    <div className="lyrics-card">
      <div className="lyrics-text">
        {displayText}
        <span className="cursor">|</span>
      </div>
    </div>
  );
}

LyricsCard.propTypes = {
  lyricText: PropTypes.string.isRequired,
};
