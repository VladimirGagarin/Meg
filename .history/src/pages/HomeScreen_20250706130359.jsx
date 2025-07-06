import React from "react";
import SongCard from "../components/SongCard";
import "./HomeScreen.css";
import Img1 from "src/assets/images/belle.jpeg"

export default function HomeScreen() {
  return (
    <div className="home-screen">
      
      <p className="subtitle">
        Enter a world of magical melodies and glowing lyrics
      </p>
      <SongCard />
    </div>
  );
}
