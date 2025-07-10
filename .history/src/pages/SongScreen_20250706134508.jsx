import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const currentAudio = useRef(null);

  // Get song by ID
  useEffect(() => {
    const foundedSong = songDetails.find((s) => s.id === id);
    if (!foundedSong) {
      navigate(-1);
    } else {
      setCurrentSongObj(foundedSong);
    }
  }, [id, navigate]);

  // Play audio when song is set
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

  return <h1>Hello screen</h1>;
}
