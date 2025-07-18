import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";
import Confetti from "react-dom-confetti";

export default function LyricsCard({ lyricText }) {
  const [stars, setStars] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 👈 new

  const toggleExpand = () => setIsExpanded((prev) => !prev); // 👈 toggle

  useEffect(() => {
    if (!lyricText) return;

    setShowConfetti(false); // Reset first, in case lyrics are updated quickly
    setTimeout(() => setShowConfetti(true), 50);
    setTimeout(() => setShowConfetti(false), 1000); // Hide after animation

    setTimeout(() => {
      setIsExpanded(true)
    }, 6000);

    // Create initial stars with gradient parameters
    const initialStars = Array(10)
      .fill()
      .map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 0.9 + 0.2}rem`,
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
    <div
    
      className={`lyrics-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
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
      {/* Confetti explosion inside the lyrics card */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "20%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Confetti active={showConfetti} />
      </div>
    </div>
  );
}

LyricsCard.propTypes = {
  lyricText: PropTypes.string.isRequired,
};
