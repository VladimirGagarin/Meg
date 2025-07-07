import React, { useState, useEffect } from "react";

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
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default Controls;
