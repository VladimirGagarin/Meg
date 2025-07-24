import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaShareAlt,
  FaHeart,
  FaForward,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { songDetails } from "./SongDetails";

const Controls = ({ audio, hideNext= true , id=null}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackError, setPlaybackError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHomeLink, setIsHomeLink] = useState(false);
  const allSongs = songDetails;
  const [currentSongId, setCurrentSongId] = useState(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.key !== "default") {
      // There is navigable history
      setIsHomeLink(false);
    } else {
      setIsHomeLink(true);
    }
  }, [location]);


  useEffect(() => {
    setCurrentSongId(id);
   }, [id]);


  useEffect(() => { 
    const songNumber = allSongs.findIndex((s) => s.id === currentSongId);
    if (songNumber !== -1) {
      setNumber(songNumber + 1);
    } else {
      setNumber(0);
    }
  }, [currentSongId, allSongs]);

  useEffect(() => {
    const audioEl = audio.current;
    if (!audioEl) return;

    audioEl
      .play()
      .then(() => {
        setIsPlaying(true);
        setPlaybackError(null);
        setIsLoading(false);
      })
      .catch(() => {
        // Autoplay might fail due to browser restrictions
        setPlaybackError("Autoplay prevented. Please click play.");
        setIsPlaying(false);
        setIsLoading(false);
      });

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
      setPlaybackError("Playback failed. Reloading...");
      setIsPlaying(false);
      setIsLoading(false);

      // Reload the page after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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

  const containerStyle = {
    ...styles.container,
    padding: isMobile ? "8px 8px" : "10px 8px",
  };

  const buttonStyle = {
    ...styles.button,
    fontSize: isMobile ? "16px" : "14px",
    padding: isMobile ? "8px" : "8px 12px",
  };

  const progressBarStyle = {
    ...styles.progressBar,

    width: isMobile ? (hideNext ? "42%" : "32%") : (hideNext ? "45%" : "42%"),
    height: isMobile ? "8px" : "6px",
  };

  const handleBack = () => {
    if (location.key !== "default") {
      // There is navigable histor
      navigate(-1);
      if (location.pathname === `/song/${currentSongId}`) {
        const song = allSongs.find(s => s.id === currentSongId);
        if(song) {
          setCurrentSongId(song.id);
          audio.current.src = song.audio;
          audio.current.play().catch(() => {  
            setPlaybackError("Playback failed. Please try again.");
          });
        }
      }
    } else {
      // No React Router history, go to /
      navigate("/");
    }
  };

  const handleShare = async () => {
    if (isSharing) return; // prevent spam clicks
    setIsSharing(true);

    const shareData = {
      title: document.title,
      text: "Sing with Magdalene – Listen to this song 💖",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
        alert("Sharing failed. You can manually copy the link.");
      }
    } finally {
      setTimeout(() => setIsSharing(false), 1500);
    }
  };

  const playNext = () => {
    const index = allSongs.findIndex((s) => s.id === currentSongId);
    if (index === -1 || index === allSongs.length - 1) {
      
      setCurrentSongId(null); // Reset if no next song
      return
    }; // No next song

    const nextSong = allSongs[index + 1];
    if (nextSong) {
      audio.current.src = nextSong.audio;
      audio.current.play().catch(() => {
        setPlaybackError("Playback failed. Please try again.");
      });
      navigate(`/song/${nextSong.id}`);
    }
   }

  // Render loading or error message instead of controls if needed
  if (isLoading) {
    return (
      <div style={styles.messageContainer}>
        <p>Magdalene is warming her voice...</p>
      </div>
    );
  }

  if (playbackError) {
    return (
      <div style={styles.messageContainer}>
        <p style={{ color: "red" }}>{playbackError}</p>
        <button style={styles.button} onClick={togglePlay}>
          Play
        </button>
      </div>
    );
  }

  // Normal controls UI
  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleBack}
        title={isHomeLink ? "Go Home" : "Go Back"}
        aria-label={isHomeLink ? "Go Home" : "Go Back"}
      >
        <FaArrowLeft />
      </button>

      <button
        style={buttonStyle}
        onClick={togglePlay}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
        aria-label={isPlaying ? "Pause song" : "Play song"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {!hideNext && (
        <button
          onClick={playNext}
          style={buttonStyle}
          title="Next song"
          aria-label="Next song"
          disabled
        >
          <FaForward />
        </button>
      )}

      <button
        style={buttonStyle}
        onClick={toggleMute}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#444")}
        aria-label={isMuted ? "Unmute" : "Mute"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <button
        style={{
          ...buttonStyle,
          backgroundColor: isSharing ? "#333" : "#444",
          cursor: isSharing ? "not-allowed" : "pointer",
          opacity: isSharing ? 0.6 : 1,
        }}
        onClick={handleShare}
        disabled={isSharing} // <-- key part to block clicks
        onMouseEnter={(e) => {
          if (!isSharing) e.currentTarget.style.backgroundColor = "#666";
        }}
        onMouseLeave={(e) => {
          if (!isSharing) e.currentTarget.style.backgroundColor = "#444";
        }}
        aria-label="Share song"
        title="Share"
      >
        <FaShareAlt />
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        style={progressBarStyle}
        aria-label="Audio progress bar"
        title="Audio progress seek"
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
    padding: "10px 20px",

    width: "100%",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "absolute",
    zIndex: 10,
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
    width: "50%",
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
    zIndex: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
};
