import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songDetails } from "../components/SongDetails";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";
import "../pages/Playlist.css";

export default function Playlist() {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { songId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(() =>
    songDetails.findIndex((song) => song.id === songId)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = songDetails[currentIndex];

  useEffect(() => {
    if (songId) {
      const index = songDetails.findIndex((song) => song.id === songId);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [songId]);

  useEffect(() => {
    navigate(`/playlist/${songDetails[currentIndex].id}`);
    setProgress(0);
    setIsPlaying(false);
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooping]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songDetails.length);
  };

  return (
    <div className="playlist-container">
      <audio ref={audioRef} src={currentSong.audio} />
      {songDetails.map((song, index) => {
        const isCurrent = index === currentIndex;

        return (
          <div
            key={song.id}
            className={`song-item ${isCurrent ? "active" : ""}`}
          >
            <button
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
                setTimeout(() => to); // Ensure play
              }}
            >
              {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <div className="song-title">{song.title}</div>

            <button onClick={toggleLoop} className={isLooping ? "loop-on" : ""}>
              <FaRedoAlt />
            </button>

            {isCurrent && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
