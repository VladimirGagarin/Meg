import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import{}
import SongItem from "./SongItem";


export default function Playlist() {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { songId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const index = songs.findIndex((s) => s.id === songId);
    if (index >= 0) setCurrentIndex(index);
  }, [songId]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleEnded = () => {
      if (isLooping) {
        audio.play();
      } else {
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentIndex(nextIndex);
        navigate(`/playlist/${songs[nextIndex].id}`);
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
  }, [currentIndex, isLooping]);

  const currentSong = songs[currentIndex];

  return (
    <div className="playlist-container">
      <audio ref={audioRef} src={currentSong.audioSrc} autoPlay />

      {songs.map((song, index) => (
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

      <PlayerControls
        audioRef={audioRef}
        isLooping={isLooping}
        onToggleLoop={() => setIsLooping((prev) => !prev)}
      />

      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
