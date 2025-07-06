import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom";
import { songDetails } from "../components/SongDetails";

export default function SongScreen() {
    const { id } = useParams();
    const [currentSongObj, setCurrentSongObj] = useState(null)

    useEffect(() => {
        const foundedSong = songDetails.find(s => s.id === id);
        if (!foundedSong) return;
        setCurrentSongObj(foundedSong);
    }, [id])


    if(cur)
    
    return <h1>Hello screen</h1>
}