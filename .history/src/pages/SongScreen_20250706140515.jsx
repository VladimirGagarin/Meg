import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import lyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import { FaPlay, FaPause, Fa } from "react-icons/fa";

export default function SongScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSongObj, setCurrentSongObj] = useState(null);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const [isPlaying, setIsplaying] = useState(false);

  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) return navigate(-1);

    setCurrentSongObj(song);
    const audio = new Audio(song.audio);
    audioRef.current = audio;
      audio.play().catch(() => {
        setIsplaying(false);
      });
      setIsplaying(true);

    // Change lyrics based on currentTime
    intervalRef.current = setInterval(() => {
      const currentTime = audio.currentTime * 1000; // convert to ms
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
  }, [id, currentLyricIndex, navigate]);

  if (!currentSongObj || !currentImage) return null;

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "";


    return (
      <div className="song-theme-animation">
        <div className="image-container">
          <img src={currentImage ? currentImage : LogoImage} />
        </div>
            <lyricsCard LyricText={currentLine} />
            <div className="controls">
                <button onClick={HandlePlayAndPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                <button></button>
            </div>
      </div>
    );
}
