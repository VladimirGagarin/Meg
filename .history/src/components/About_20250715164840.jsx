// src/screens/FarewellScreen.jsx
import React, {useEffect, useRef} from "react";
import RosesAnthemAudio from "../assets/audios/roses.mp3"; // adjust path
import { RosesOfRomeLyrics } from "./SongData";
import Controls from "./Controls";

export default function FarewellScreen() {
    const lyricsList = RosesOfRomeLyrics();

    useEffect(() => {
        const audioRef = useRef(new Audio());
        const audio = audioRef.current;
        audio.src = RosesAnthemAudio;
   }, [window.location.href])
    

  return (
    <div className="farewell-screen">
      <h1>🌹 Roses of Rome</h1>
      <p>May your voice echo forever through Magdalene’s garden.</p>

          <div className="Lyrics-animation" style={{ position: "relative" }}>
              <Controls audio={audioRef}/>
      </div>

      

      <p style={{ marginTop: "1.5rem" }}>Aeternum floreamus. 🕊️</p>
    </div>
  );
}
