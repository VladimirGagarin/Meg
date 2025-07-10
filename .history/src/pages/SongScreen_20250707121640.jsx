import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeOff,
  FaArrowLeft,
} from "react-icons/fa";
import "./SongScreen.css";
import Controls from "../components/Controls";

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [playbackError, setPlaybackError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

    const handleCanPlay = () => {
      if (userInteracted && isPlaying) {
        audio.play().catch(handlePlaybackError);
      }
    };

    const handlePlaybackError = (err) => {
      console.error("Playback error:", err);
      setIsPlaying(false);
      setPlaybackError(
        err.message.includes("user gesture")
          ? "Please click the play button to start audio"
          : "Playback failed. Try refreshing the page."
      );
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("error", handlePlaybackError);

    // Set initial random image
    const randomImage = megImages[Math.floor(Math.random() * megImages.length)];
    setCurrentImage(randomImage);

    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("play", () => setIsPlaying(true));
      audio.removeEventListener("pause", () => setIsPlaying(false));
      audio.removeEventListener("error", handlePlaybackError);
    };
  }, [id, navigate, userInteracted, isPlaying]);

  // Handle lyrics, image synchronization, and progress
  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const updateLyricsAndImage = () => {
      const currentTime = audio.currentTime * 1000;

      // Find current lyric
      const newIndex = currentSongObj.lyrics.findIndex(
        (line) => currentTime >= line.start && currentTime < line.end
      );

      if (newIndex !== -1 && newIndex !== currentLyricIndex) {
        setCurrentLyricIndex(newIndex);
        // Change image for every new lyric
        const randomImage =
          megImages[Math.floor(Math.random() * megImages.length)];
        setCurrentImage(randomImage);
      }
    };

    if (isPlaying) {
      intervalRef.current = setInterval(updateLyricsAndImage, 100);
      progressIntervalRef.current = setInterval(updateProgress, 100);
      audio.play().catch((err) => {
        setPlaybackError(
          err.message.includes("user gesture")
            ? "Please click the play button to start audio"
            : `Playback error: ${err.message}`
        );
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSongObj, currentLyricIndex, userInteracted]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!userInteracted) setUserInteracted(true);
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeToggle = () => {
    setIsMuted((prev) => !prev);
    if (isMuted && volume === 0) setVolume(0.7);
  };

  const handleProgressChange = (e) => {
    if (audioRef.current && currentSongObj) {
      const newProgress = parseFloat(e.target.value);
      setProgress(newProgress);
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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
          onError={() => setCurrentImage(LogoImage)}
        />
      </div>

      {playbackError && (
        <div className="error-message">
          {playbackError}
          {playbackError.includes("user gesture") && (
            <button onClick={handlePlayPause} className="error-retry-button">
              Click to Play
            </button>
          )}
        </div>
      )}

      <LyricsCard lyricText={currentLine} />

      <div className="progress-container">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          className="progress-slider"
        />
      </div>

      <div className="controls">
        <button className="control-button" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>

        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="control-button"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={handleVolumeToggle}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="control-button"
        >
          {isMuted ? <FaVolumeOff /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
}
