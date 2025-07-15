import React, { useEffect, useRef, useState } from "react";
import RosesAnthemAudio from "../assets/audios/roses.mp3";
import { RosesOfRomeLyrics } from "./SongData";
import Controls from "../components/Controls";

export default function FarewellScreen() {
  const audioRef = useRef(new Audio(RosesAnthemAudio));
  const lyricsList = RosesOfRomeLyrics(); // expects [{ start, end, text }]
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    const updateLyrics = () => {
      const currentTimeMs = audio.currentTime * 1000;

      const activeLine = lyricsList.find(
        (line) => currentTimeMs >= line.start && currentTimeMs <= line.end
      );

      setCurrentLine(activeLine?.text || "[ Roses Of Rome Anthem ]");
    };

    

    const interval = setInterval(updateLyrics, 150);

    return () => clearInterval(interval);
  }, [lyricsList]);

  return (
    <div className="farewell-screen" style={styles.screen}>
      <h1 style={styles.heading}>🌹 Roses of Rome</h1>
      <p style={styles.intro}>
        May your voice echo forever through Magdalene’s garden.
      </p>

      {/* Animated Lyric */}
      <div style={styles.lyricBox}>
        <p key={currentLine} style={styles.lyric}>
          {currentLine}
        </p>
      </div>

      {/* Controls */}
      <Controls audio={audioRef} />

      <p style={styles.footer}>Aeternum floreamus. 🕊️</p>
    </div>
  );
}

const styles = {
  screen: {
    textAlign: "center",
    padding: "2rem 1rem",
    fontFamily: "'Cinzel', serif",
    backgroundColor: "#0c111f",
    color: "#f0e6f6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#f7c8d4",
  },
  intro: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    marginBottom: "2rem",
    color: "#ccc",
  },
  lyricBox: {
    minHeight: "3rem",
    margin: "0 auto",
    padding: "1rem",
    background: "linear-gradient(135deg, #2b2b3a, #1c1c2c)",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(255, 192, 203, 0.3)",
    width: "90%",
    maxWidth: "600px",
    minHeight: "20vh",
    transition: "all 0.4s ease",
  },
  lyric: {
    fontSize: "1.4rem",
    color: "#f2e4f9",
    transition: "opacity 0.4s ease-in-out",
    animation: "fadeIn 0.5s ease-in",
    textTransform: "capitalize",
  },
  footer: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    marginTop: "3rem",
    color: "#ffdee9",
  },
};
