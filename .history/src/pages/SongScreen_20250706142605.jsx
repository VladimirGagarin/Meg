import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeOff } from "react-icons/fa";
import "./SongScreen.css"; // make sure styling is applied

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Load the song on mount
  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) return navigate(-1);
    setCurrentSongObj(song);

    const audio = new Audio(song.audio);
    audio.loop = false;
    audioRef.current = audio;

    // Try auto play
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    // Setup lyric/image sync
    intervalRef.current = setInterval(() => {
      const currentTime = audio.currentTime * 1000;
      const index = song.lyrics.findIndex(
        (line) => currentTime >= line.start && currentTime < line.end
      );
      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
        const randImg = megImages[Math.floor(Math.random() * megImages.length)];
        setCurrentImage(randImg);
      }
    }, 200);

    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
    };
  }, [id,currentLyricIndex, na]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  if (!currentSongObj || !currentImage) return null;

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "";

  return (
    <div className="song-theme-animation">
      <div className="image-container">
        <img src={currentImage || LogoImage} alt="magical" />
      </div>

      <LyricsCard LyricText={currentLine} />

      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleMuteToggle}>
          {isMuted ? <FaVolumeOff /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
}
