import Controls from "../components/Controls";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import SonnetSong from "../assets/audios/sonnet.mp3";
import { SonnetLyrics } from "../components/SongData";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";

import "./SongScreen.css";

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showSonnetModalConfim, setshowSonnetModalConfim] = useState(false);
  const [showSonnetModal, setshowSonnetModal] = useState(false);
  const [isPlayingSonnet, setIsPlayingSonnet] = useState(false);
  const [currentSonnetLyricIndex, setSonnetLyricIndex] = useState(0);

  const songScreenRef = useRef(null);
  const audioRef = useRef(new Audio());
  const sonnetAudioRef = useRef(new Audio(SonnetSong));

  useEffect(() => {
    songScreenRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSongObj]);

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
    audio.loop = song.id !== "director_song";

    const randomImage = megImages[Math.floor(Math.random() * megImages.length)];
    setCurrentImage(randomImage);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [id, navigate]);

  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      const currentTimeMs = audio.currentTime * 1000;
      let newIndex = currentSongObj.lyrics.findIndex((line, i) => {
        const next = currentSongObj.lyrics[i + 1];
        return (
          currentTimeMs >= line.start && (!next || currentTimeMs < next.start)
        );
      });

      if (newIndex !== -1 && newIndex !== currentLyricIndex) {
        setCurrentLyricIndex(newIndex);
        setCurrentImage(
          megImages[Math.floor(Math.random() * megImages.length)]
        );
      }
    };

    const onEnded = () => {
      setCurrentLyricIndex(0);
      if (currentSongObj.id === "director_song") {
        setshowSonnetModalConfim(true);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSongObj, currentLyricIndex]);

  const handleSonnetsong = () => {
    setshowSonnetModalConfim(false);
    setshowSonnetModal(true);
    audioRef.current.pause();
    sonnetAudioRef.current.currentTime = 0;
    sonnetAudioRef.current.play();
    setIsPlayingSonnet(true);
  };

  const closeSonnetModal = () => {
    sonnetAudioRef.current.pause();
    sonnetAudioRef.current.currentTime = 0;
    setIsPlayingSonnet(false);
    setshowSonnetModal(false);
    audioRef.current.play();
  };

  const toggleSonnetPlay = () => {
    if (isPlayingSonnet) {
      sonnetAudioRef.current.pause();
    } else {
      sonnetAudioRef.current.play();
    }
    setIsPlayingSonnet(!isPlayingSonnet);
  };

  const currentLine =
    currentSongObj?.lyrics[currentLyricIndex]?.text || "Sing With Magdalene";

  return (
    <div className="song-screen" ref={songScreenRef}>
      <div className="image-container" onDoubleClick={() => setShowModal(true)}>
        <img
          src={currentImage}
          alt="Visual representation"
          className="song-image"
          onError={() => setCurrentImage(LogoImage)}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <LyricsCard
        lyricText={currentLine}
        currentLyricIndex={currentLyricIndex}
      />

      {audioRef.current?.src && <Controls audio={audioRef} />}

      {showSonnetModalConfim && (
        <div className="modal-overlay">
          <div className="sonnet-modal">
            <h2>A Gentle Confirmation</h2>
            <p>Would you like to listen  to our real sonnet?</p>
            <div className="modal-buttons">
              <button className="yes-btn" onClick={handleSonnetsong}>
                Yes, unveil it
              </button>
              <button
                className="no-btn"
                onClick={() => setshowSonnetModalConfim(false)}
              >
                No, not now
              </button>
            </div>
          </div>
        </div>
      )}

      {showSonnetModal && (
        <div className="Sonnet-overlay">
          <div className="Sonnet-content">
            <div className="Controls">
              <button onClick={toggleSonnetPlay}>
                {isPlayingSonnet ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={closeSonnetModal}>
                <FaTimes /> Stop
              </button>
            </div>
            <div className="lyrics-sonnet">
              {SonnetLyrics()[currentSonnetLyricIndex]?.text ||
                "A Sonnet is Playing..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
