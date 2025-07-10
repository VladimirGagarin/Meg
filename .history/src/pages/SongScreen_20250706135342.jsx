import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import { lyricsCard } from "../components/lyricsCard";

export default function SongScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSongObj, setCurrentSongObj] = useState(null);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) return navigate(-1);

    setCurrentSongObj(song);
    const audio = new Audio(song.audio);
    audioRef.current = audio;
    audio.play();

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
  }, [id]);

  if (!currentSongObj || !currentImage) return null;

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "";


    return (
        <div className="song">
            
        </div>
  );
}
