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
      if (index < lyricText.length) {
        setDisplayText((prev) => prev + lyricText[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30); // Typing speed

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
