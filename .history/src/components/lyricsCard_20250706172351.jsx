import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";

export default function LyricsCard({ lyricText }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!lyricText) return;

    // Create initial stars
    const initialStars = Array(20)
      .fill()
      .map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 0.5 + 0.2}rem`,
        opacity: Math.random(),
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 2}s`,
      }));
    setStars(initialStars);

    // Update stars periodically for more dynamism
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: Math.random(),
          delay: `${Math.random() * 5}s`,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [lyricText]);

  return (
    <div className="lyrics-card">
      <div className="lyrics-text">{lyricText}</div>
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

LyricsCard.propTypes = {
  lyricText: PropTypes.string.isRequired,
};
