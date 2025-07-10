import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";

export default function LyricsCard({ lyricText }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!lyricText) return;

    // Create initial stars with gradient parameters
    const initialStars = Array(2)
      .fill()
      .map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 0.5 + 0.2}rem`,
        opacity: Math.random(),
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 2}s`,
        gradientStart: getRandomColor(),
        gradientEnd: getRandomColor(),
      }));
    setStars(initialStars);

    // Update stars and gradients periodically
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: Math.random(),
          delay: `${Math.random() * 5}s`,
          gradientStart: star.gradientEnd,
          gradientEnd: getRandomColor(),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [lyricText]);

  function getRandomColor() {
    const colors = [
      "#0456b3",
      "#ff3366",
      "#2ec4b6",
      "#e71d36",
      "#ff9f1c",
      "#662e9b",
      "#43bccd",
      "#f86624",
      "#ffffff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

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
              background: `linear-gradient(135deg, ${star.gradientStart}, ${star.gradientEnd})`,
              "--gradient-start": star.gradientStart,
              "--gradient-end": star.gradientEnd,
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
