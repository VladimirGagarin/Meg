import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songDetails } from "../components/SongDetails";
import SongItem from "./SongItem";
import "../pages/Playlist.css";


export default function Playlist() {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { songId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  
    return (
        <div className="Playlist-container">
            songDetails.map(() => )
        </div>
    )

}
