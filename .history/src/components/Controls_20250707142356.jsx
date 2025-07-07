import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, Fa } from "react-icons/fa";
import { Link } from "react-router-dom";

const Controls = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackError, setPlaybackError] = useState(null);

  useEffect(() => {
    const audioEl = audio.current;
    if (!audioEl) return;

    // Update progress as audio plays
    const updateProgress = () => {
      setProgress((audioEl.currentTime / audioEl.duration) * 100 || 0);
    };

    // Playback event handlers
    const onPlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setPlaybackError(null);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onWaiting = () => {
      // Audio is loading/buffering
      setIsLoading(true);
    };

    const onCanPlay = () => {
      setIsLoading(false);
    };

    const onError = () => {
      setPlaybackError("Playback failed. Please try again.");
      setIsPlaying(false);
      setIsLoading(false);
    };

    // Mute state sync
    setIsMuted(audioEl.muted);

    audioEl.addEventListener("timeupdate", updateProgress);
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("pause", onPause);
    audioEl.addEventListener("waiting", onWaiting);
    audioEl.addEventListener("canplay", onCanPlay);
    audioEl.addEventListener("error", onError);

    // Cleanup listeners on unmount or audio change
    return () => {
      audioEl.removeEventListener("timeupdate", updateProgress);
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("pause", onPause);
      audioEl.removeEventListener("waiting", onWaiting);
      audioEl.removeEventListener("canplay", onCanPlay);
      audioEl.removeEventListener("error", onError);
    };
  }, [audio]);

  // Play/Pause toggle
  const togglePlay = () => {
    const audioEl = audio.current;
    if (!audioEl) return;

    if (audioEl.paused) {
      audioEl.play().catch(() => {
        setPlaybackError("Playback failed. Please try again.");
      });
    } else {
      audioEl.pause();
    }
  };

  // Mute toggle
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

  // Render loading or error message instead of controls if needed
  if (isLoading) {
    return (
      <div style={styles.messageContainer}>
        <p>Loading audio...</p>
      </div>
    );
  }

  if (playbackError) {
    return (
      <div style={styles.messageContainer}>
        <p style={{ color: "red" }}>{playbackError}</p>
        <button style={styles.button} onClick={togglePlay}>
          Retry
        </button>
      </div>
    );
  }

  // Normal controls UI
  return (
    <div style={styles.container}>
      <Link to={'/home'} style={[styles.button, {textDecoration: "none"}]}>
          <FaArrowLeft />
      </Link>
      <button
        style={styles.button}
        onClick={togglePlay}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button
        style={styles.button}
        onClick={toggleMute}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        style={styles.progressBar}
        aria-label="Audio progress bar"
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
  messageContainer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: "100%",
  },
};
