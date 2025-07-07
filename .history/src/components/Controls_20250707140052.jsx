import React, { useState, useEffect } from "react";
import { FaPlay, FaP } from "react-icons/fa";

  
const Controls = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Update progress as audio plays
  useEffect(() => {
    const audioEl = audio.current;
    if (!audioEl) return;

    const updateProgress = () => {
      setProgress((audioEl.currentTime / audioEl.duration) * 100 || 0);
    };

    audioEl.addEventListener("timeupdate", updateProgress);

    return () => {
      audioEl.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio]);

  // Play/Pause handler
  const togglePlay = () => {
    const audioEl = audio.current;
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play();
      setIsPlaying(true);
    } else {
      audioEl.pause();
      setIsPlaying(false);
    }
  };

  // Mute/Unmute handler
  const toggleMute = () => {
    const audioEl = audio.current;
    if (!audioEl) return;
    audioEl.muted = !audioEl.muted;
    setIsMuted(audioEl.muted);
  };

  // Seek progress bar
  const handleProgressChange = (e) => {
    const audioEl = audio.current;
    if (!audioEl) return;
    const newTime = (e.target.value / 100) * audioEl.duration;
    audioEl.currentTime = newTime;
    setProgress(e.target.value);
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={togglePlay}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        style={styles.button}
        onClick={toggleMute}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        style={styles.progressBar}
        // Customizing the thumb for WebKit browsers
        onMouseDown={(e) => (e.target.style.backgroundColor = "#1db954")}
        onMouseUp={(e) => (e.target.style.backgroundColor = "#555")}
      />
    </div>
  );
  
};

export default Controls;


const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#0c111f85",
    padding: "10px 15px",
    borderRadius: "8px",
    width: "100%",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "absolute",
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#444",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#666",
  },
  progressBar: {
    width: "60%",
    cursor: "pointer",
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "#555",
    appearance: "none",
    outline: "none",
  },
  progressBarThumb: {
    appearance: "none",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: "#1db954",
    cursor: "pointer",
    border: "none",
    marginTop: "-4px",
  },
};
  