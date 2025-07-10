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


    if (currentSongObj) {
        if(currentAudio)
        const audio = new Audio(currentSongObj.audio);

        audio.play();
    }
    else {
        navigate(-1)
    }
    
    return <h1>Hello screen</h1>
}