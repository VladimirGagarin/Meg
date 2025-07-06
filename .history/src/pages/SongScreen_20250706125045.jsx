import React, {useEffect} from "react"
import { useParams useNavigate } from "react-router-dom";
import { songDetails } from "../components/SongDetails";

export default function SongScreen() {
    const { id } = useParams();
    
    return <h1>Hello screen</h1>
}