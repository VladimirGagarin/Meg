import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard"; // Note: component names should be PascalCase
import LogoImage from "../assets/images/belle.png";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeOff } from "react-icons/fa";
import "./SongScreen.css"; // Assuming you have a CSS file for this component

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage); // Default to logo
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range: 0 to 1
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const [playbackError, setPlaybackError] = useState(null);

  // Initialize song and audio
  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) return navigate(-1);

    setCurrentSongObj(song);
    const audio = new Audio(song.audio);
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.play();
        setPlaybackError(null);
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
        setIsPlaying(false);
        setPlaybackError("Audio playback failed. Please check file format.");
      }
    };

    playAudio();

    // Set up audio event listeners
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    // Load a random image initially
    setCurrentImage(megImages[Math.floor(Math.random() * megImages.length)]);

    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("play", () => setIsPlaying(true));
      audio.removeEventListener("pause", () => setIsPlaying(false));
    };
  }, [id, navigate]);

  // Handle play/pause and lyric synchronization
  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    // Update lyrics based on current time
    const updateLyrics = () => {
      const currentTime = audio.currentTime * 1000; // convert to ms
      const index = currentSongObj.lyrics.findIndex(
        (line) => currentTime >= line.start && currentTime < line.end
      );

      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
        // Change image every 3 lyric changes for variety
        if (index % 3 === 0) {
          setCurrentImage(
            megImages[Math.floor(Math.random() * megImages.length)]
          );
        }
      }
    };

    intervalRef.current = setInterval(updateLyrics, 200);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentSongObj, currentLyricIndex]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
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
        <img
          src={currentImage}
          alt="Visual representation"
          className="song-image"
        />
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
