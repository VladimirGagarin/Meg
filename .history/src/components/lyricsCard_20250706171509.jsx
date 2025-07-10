import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";

export default function LyricsCard({ lyricText }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!lyricText) return;

    setDisplayText("");
    let index = 0;

    const timer = setInterval(() => {
      setDisplayText((prev) => prev + lyricText[index]);
      index++;

      if (index >= lyricText.length) {
        clearInterval(timer);
      }
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
