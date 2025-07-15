// src/screens/FarewellScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import RosesAnthemAudio from "../assets/audios/roses.mp3";
import { RosesOfRomeLyrics } from "../components/SongData"; // adjust if needed
import Controls from "../components/Controls"; // reuse your existing player

export default function FarewellScreen() {
  const audioRef = useRef(new Audio(RosesAnthemAudio));
  const lyricsList = RosesOfRomeLyrics(); // must return array: [{ start, end, text }]
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    const updateLyrics = () => {
      const currentTime = audio.currentTime;

      const activeLine = lyricsList.find(
        (line) => currentTime >= line.start && currentTime <= line.end
      );

      setCurrentLine(activeLine?.text || "");
    };

    
    const interval = setInterval(updateLyrics, 200);

    return () => clearInterval(interval);
  }, [lyricsList]);

  return (
    <div className="farewell-screen">
      <h1>🌹 Roses of Rome</h1>
      <p>May your voice echo forever through Magdalene’s garden.</p>

      <div
        className="Lyrics-animation"
        style={{
          marginTop: "2rem",
          fontSize: "1.3rem",
          textAlign: "center",
          fontStyle: "italic",
          transition: "all 0.3s ease-in-out",
          minHeight: "3em",
        }}
      >
        {currentLine && (
          <p
            style={{
              opacity: 1,
              transform: "scale(1.05)",
              color: "#f2dede",
            }}
          >
            {currentLine}
          </p>
        )}
      </div>

      {/* Audio controls */}
      <Controls audio={audioRef} />

      <p style={{ marginTop: "1.5rem" }}>Aeternum floreamus. 🕊️</p>
    </div>
  );
}
