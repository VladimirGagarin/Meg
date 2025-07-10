import React, {useEffect, useState, useRef} from "react"
import { useParams, useNavigate } from "react-router-dom";
import { songDetails } from "../components/SongDetails";


export default function SongScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSongObj, setCurrentSongObj] = useState(null);
    const currentAudio = useRef(null);

    useEffect(() => {
        const foundedSong = songDetails.find(s => s.id === id);
        if (!foundedSong) return;
        setCurrentSongObj(foundedSong);
    }, [id])

    useEffect(() => {
      if (currentSongObj) {
        if (currentAudio.current) {
          currentAudio.current.pause();
          currentAudio.current.currentTime = 0;
        }

        currentAudio.current = new Audio(currentSongObj.audio);
        currentAudio.current.play();
      }
    }, [currentSongObj]);
      
    
    return <h1>Hello screen</h1>
}