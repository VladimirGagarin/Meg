
import { songDetails } from "./SongDetails";
import "./SongCard.css";
import LogoImage from "../assets/images/quuen.jpeg";
import DirectorImage from "../assets/images/ror.png";

import { Link } from "react-router-dom";

export default function SongCard() {
  return (
    <div className="song-card-container">
      {songDetails.map((song) => (
        <Link
          key={song.id} // ✅ Place key here
          to={`/song/${song.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="song-card">
            <div className="image-wrapper">
              <img src={song.id === "LogoImage} alt={song.title} />
            </div>
            <h3 className="song-title">{song.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
