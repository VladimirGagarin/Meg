import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../pages/SongScreen.css";
import Confetti from "react-dom-confetti";

export default function LyricsCard({ lyricText, currentLyricIndex , audioStalled}) {
  const [stars, setStars] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isExpanded, setIsExpanded] = useState(!navigator.onLine); // ⬅️ expanded if offline

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (currentLyricIndex === 0) {
      setIsExpanded(true);

      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, [currentLyricIndex]);

  useEffect(() => {
    if (audioStalled) {

  useEffect(() => {
    if (!lyricText) return;

    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 50);
    setTimeout(() => setShowConfetti(false), 1000);

    const initialStars = Array(isExpanded ? 30 : 10)
      .fill()
      .map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: isExpanded
          ? `${Math.random() * 1.2 + 0.4}rem`
          : `${Math.random() * 0.6 + 0.1}rem`,
        opacity: isExpanded
          ? Math.random() * 0.5 + 0.5
          : Math.random() * 0.3 + 0.1,
        delay: `${Math.random() * (isExpanded ? 2 : 5)}s`,
        duration: `${
          Math.random() * (isExpanded ? 2 : 3) + (isExpanded ? 1 : 2)
        }s`,
        gradientStart: isExpanded ? getBrightColor() : getRandomColor(),
        gradientEnd: getRandomColor(),
      }));

    setStars(initialStars);
  }, [lyricText, isExpanded]); // ✅ Leave this — now it works properly

  function getBrightColor() {
    const brightColors = [
      "#ffffff",
      "#ffeecc",
      "#ccffff",
      "#ffddee",
      "#e0f7fa",
    ];
    return brightColors[Math.floor(Math.random() * brightColors.length)];
  }

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
      <div
        className="lyrics-text"
        style={{ color: isOnline ? "#fff" : "orange" }}
      >
        {lyricText}
      </div>

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
  currentLyricIndex: PropTypes.number.isRequired,
};
