import Controls from "../components/Controls";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import { FaArrowLeft} from "react-icons/fa";
import "./SongScreen.css";


export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);
  
  const audioRef = useRef(null);

  // Initialize audio and song
  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) {
      navigate(-1);
      return;
    }

    setCurrentSongObj(song);
    const audio = new Audio(song.audio);
    audio.preload = "auto";
    audioRef.current = audio;

    // Set initial random image
    const randomImage = megImages[Math.floor(Math.random() * megImages.length)];
    setCurrentImage(randomImage);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [id, navigate]);

  // Lyric and image sync based on audio timeupdate event
  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      const currentTimeMs = audio.currentTime * 1000;
      const newIndex = currentSongObj.lyrics.findIndex(
        (line) => currentTimeMs >= line.start && currentTimeMs < line.end
      );

      if (newIndex !== -1 && newIndex !== currentLyricIndex) {
        setCurrentLyricIndex(newIndex);
        const randomImage =
          megImages[Math.floor(Math.random() * megImages.length)];
        setCurrentImage(randomImage);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [currentSongObj, currentLyricIndex]);

  if (!currentSongObj) {
    return <div className="loading">Loading song...</div>;
  }

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "";

  return (
    <div className="song-screen">
      <button onClick={() => navigate(-1)} className="control-button">
        <FaArrowLeft />
      </button>
      <
      <div className="image-container">
        <img
          src={currentImage}
          alt="Visual representation"
          className="song-image"
          onError={() => setCurrentImage(LogoImage)}
        />
      </div>

      <LyricsCard lyricText={currentLine} />

      {/* Pass audioRef to Controls to handle play/mute/progress */}
      <Controls audio={audioRef} />
    </div>
  );
}
