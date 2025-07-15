
import { songDetails } from "./SongDetails";
import "./SongCard.css";
import LogoImage from "../assets/images/quuen.jpeg";
import DirectorImage from "../assets/images/ror.png";

import { Link } from "react-router-dom";
import { useMemo } from "react";

// Shuffle function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SongCard() {
  
  return (
    <div className="song-card-container">
      {songDetails.map((song) => (
        <Link
          key={song.id} // ✅ Place key here
          to={`/song/${song.id}`}
          aria-label={`Go to ${song.title} song`}
          style={{ textDecoration: "none" }}
        >
          <div className="song-card">
            <div className="image-wrapper">
              <img
                src={song.id === "director_song" ? DirectorImage : LogoImage}
                alt={song.title}
              />
            </div>
            <h3 className="song-title">{song.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
