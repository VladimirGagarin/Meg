import React from "react";
import SongCard from "../components/SongCard";
import "./HomeScreen.css";

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      <p className="subtitle">
        Enter a world of magical melodies and glowing lyrics
      </p>
      <SongCard />
    </div>
  );
}
