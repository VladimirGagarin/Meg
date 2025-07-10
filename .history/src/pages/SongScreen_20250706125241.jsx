import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom";
import { songDetails } from "../components/SongDetails";

export default function SongScreen() {
    const { id } = useParams();
    const [currentSong, setCurrentSong] = useState

    useEffect(() => {
        const 
    }, [id])
    
    return <h1>Hello screen</h1>
}