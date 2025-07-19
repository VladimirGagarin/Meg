import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songDetails } from "../components/SongDetails";
import SongItem from "./Song"


export default function Playlist() {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { songId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const index = songDetails.findIndex((s) => s.id === songId);
    if (index >= 0) setCurrentIndex(index);
  }, [songId]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleEnded = () => {
      if (isLooping) {
        audio.play();
      } else {
        const nextIndex = (currentIndex + 1) % songDetails.length;
        setCurrentIndex(nextIndex);
        navigate(`/playlist/${songDetails[nextIndex].id}`);
      }
    };

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentIndex, isLooping, navigate]);

  const currentSong = songDetails[currentIndex];

  return (
    <div className="playlist-container">
      <audio ref={audioRef} src={currentSong.audioSrc} autoPlay />

      {songDetails.map((song, index) => (
        <SongItem
          key={song.id}
          song={song}
          isActive={index === currentIndex}
          onClick={() => {
            setCurrentIndex(index);
            navigate(`/playlist/${song.id}`);
          }}
        />
      ))}
     
    </div>
  );
}
