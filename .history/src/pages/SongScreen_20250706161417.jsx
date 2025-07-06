import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeOff } from "react-icons/fa";
import "./SongScreen.css";

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7); // Default to 70% volume
  const [playbackError, setPlaybackError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize song and audio
  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) {
      navigate(-1);
      return;
    }

    setCurrentSongObj(song);
    const audio = new Audio();
    audio.src = song.audio;
    audio.preload = "auto";
    audioRef.current = audio;

    // Set up audio event listeners
    const handleCanPlay = () => {
      if (userInteracted && isPlaying) {
        audio.play().catch(handlePlaybackError);
      }
    };

    const handlePlaybackError = (err) => {
      console.error("Playback error:", err);
      setIsPlaying(false);
      setPlaybackError("Playback failed. Please interact first.");
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("error", handlePlaybackError);

    setCurrentImage(megImages[Math.floor(Math.random() * megImages.length)]);

    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("play", () => setIsPlaying(true));
      audio.removeEventListener("pause", () => setIsPlaying(false));
      audio.removeEventListener("error", handlePlaybackError);
    };
  }, [id, navigate, userInteracted, isPlaying]);

  // Handle play/pause and lyric synchronization
  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;

    const audio = audioRef.current;

    const updateLyrics = () => {
      const currentTime = audio.currentTime * 1000;
      const index = currentSongObj.lyrics.findIndex(
        (line) => currentTime >= line.start && currentTime < line.end
      );

      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
        if (index % 3 === 0) {
          setCurrentImage(megImages[Math.floor(Math.random() * megImages.length)]);
        }
      }
    };

    if (isPlaying) {
      intervalRef.current = setInterval(updateLyrics, 200);
      audio.play().catch((err) => {
        if (!userInteracted) {
          setPlaybackError("Click the play button to start audio");
        } else {
          setPlaybackError(`Playback error: ${err.message}`);
        }
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentSongObj, currentLyricIndex, userInteracted]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  if (!currentSongObj) {
    return <div className="loading">Loading song...</div>;
  }

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "";

  return (
    <div className="song-screen">
      <div className="image-container">
        <img src={currentImage} alt="Visual representation" className="song-image" />
      </div>

      {playbackError && <div className="error-message">{playbackError}</div>}
      <LyricsCard lyricText={currentLine} isActive={isPlaying} />

      <div className="controls">
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="control-button"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="volume-controls">
          <button
            onClick={handleVolumeToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="control-button"
          >
            {isMuted ? <FaVolumeOff /> : <FaVolumeUp />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}