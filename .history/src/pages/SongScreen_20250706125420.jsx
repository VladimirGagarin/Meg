import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom";
import { songDetails } from "../components/SongDetails";

export default function SongScreen() {
    const { id } = useParams();
    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
        const foundedSong = songDetails.find(s => s.id === id);
        if (!foundedSong) return;
        setCurrentSong(foundedSong.)
    }, [id])
    
    return <h1>Hello screen</h1>
}