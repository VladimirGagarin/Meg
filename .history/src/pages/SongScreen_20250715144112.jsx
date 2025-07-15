import Controls from "../components/Controls";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";

import "./SongScreen.css";


export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);

  useEffect(() => {
    if (currentSongObj) {
      document.title = `${currentSongObj.title} | Sing With Magdalene`;
    } else {
      document.title = "Sing With Magdalene";
    }

    return () => {
      document.title = "Sing With Magdalene";
    };
  }, [currentSongObj]);
  
  
  const audioRef = useRef(new Audio());


  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) {
      navigate(-1);
      return;
    }

    setCurrentSongObj(song);
    const audio = audioRef.current;
    audio.src = song.audio;
    audio.preload = "auto";
    audio.loop = true;

    // Set initial random image
    const randomImage = megImages[Math.floor(Math.random() * megImages.length)];
    setCurrentImage(randomImage);

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
      let newIndex = -1;

      // Iterate through lyrics to find the current one
      for (let i = 0; i < currentSongObj.lyrics.length; i++) {
        const line = currentSongObj.lyrics[i];

        // For all lines except the last one, use the strict < line.end
        if (i < currentSongObj.lyrics.length - 1) {
          if (currentTimeMs >= line.start && currentTimeMs < line.end) {
            newIndex = i;
            break;
          }
        } else {
          // For the very last line, allow it to be shown until the end of the song
          // or until its designated end time.
          if (currentTimeMs >= line.start && currentTimeMs <= line.end) {
            newIndex = i;
            break;
          }
          // Fallback for the very end of the song if lyric.end is slightly off
          // If we are at the end of the song and no lyric matched, assume it's the last one
          if (i === currentSongObj.lyrics.length - 1 && audio.ended) {
            newIndex = i; // Ensure last lyric remains visible when song ends
            break;
          }
        }
      }

      // If no lyric is active but the audio is still playing after all lyrics,
      // and it's the last lyric, ensure it stays active.
      // This handles cases where the lyric.end might be slightly before the song ends.
      if (
        newIndex === -1 &&
        audio.currentTime * 1000 >=
          currentSongObj.lyrics[currentSongObj.lyrics.length - 1].start
      ) {
        newIndex = currentSongObj.lyrics.length - 1;
      }

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
    return (
      <div className="loading">
        She’s almost here — Magdalene is brushing stardust off her voice...
      </div>
    );
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
          onContextMenu={(e) => showContext(e)}
        />
      </div>

      <LyricsCard lyricText={currentLine} />

      {/* Pass audioRef to Controls to handle play/mute/progress */}
      {audioRef.current?.src && <Controls audio={audioRef} />}
    </div>
  );
}
