// src/screens/FarewellScreen.jsx
import React from "react";
import RosesAnthemAudio from "../assets/audios/roses.mp3"; // adjust path
import {RosesOfRomeLyrics} from "./SongData";

export default function FarewellScreen() {
    const lyricsList = RosesOfRomeLyrics();
  return (
    <div className="farewell-screen">
      <h1>🌹 Roses of Rome</h1>
      <p>May your voice echo forever through Magdalene’s garden.</p>

      {/* <RosesOfRomeLyrics /> */}

      <audio controls autoPlay>
        <source src={RosesAnthemAudio} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      <p style={{ marginTop: "1.5rem" }}>Aeternum floreamus. 🕊️</p>
    </div>
  );
}
