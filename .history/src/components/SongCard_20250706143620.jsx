import { songDetails } from "./SongDetails";
import "./SongCard.css";
import LogoImage from "../assets/images/belle.png";
import { Link } from "react-router-dom";

export default function SongCard() {
  return (
    <div className="song-card-container">
          {songDetails.map((song) => (
          <Link to={`/song/${song.id}`}>
        <div key={song.id + } className="song-card">
          <div className="image-wrapper">
            <img src={LogoImage} alt={song.title} />
          </div>
          <h3 className="song-title">{song.title}</h3>
        </div>
        </Link>
      ))}
    </div>
  );
}
