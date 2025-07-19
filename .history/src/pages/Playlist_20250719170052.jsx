import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songDetails } from "../components/SongDetails";
import { FaPlay, FaPause, FaRedoAlt, FaTimes } from "react-icons/fa";
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
    const [error, setError] = useState(null);
    const songItem = useRef(null);

  const currentSong = songDetails[currentIndex];

  useEffect(() => {
    if (songId) {
      const index = songDetails.findIndex((song) => song.id === songId);
      if (index !== -1) setCurrentIndex(index);
      setIsPlaying(true);
    }
  }, [songId]);

  useEffect(() => {
    navigate(`/playlist/${songDetails[currentIndex].id}`);
    setProgress(0);
  }, [currentIndex, navigate]);

  // Add this new useEffect for autoplay functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        setError({
          message: "Autoplay blocked or failed",
          song: currentSong.title,
          onRetry: () => {
            audio.load();
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch(() =>
                setError({ ...error, message: "Still unable to play" })
              );
          },
        });
          setIsPlaying(false);
          console.warn(err)
      }
    };

    // Load and wait for readiness
    audio.load();
    audio.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [currentIndex, currentSong]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setError({
        message: "Failed to play the song",
        song: currentSong.title,
        onRetry: () => {
          audio.load();
          audio
            .play()
            .catch(() =>
              setError({ ...error, message: "Still unable to play" })
            );
        },
      });
      setIsPlaying(false);
    };

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
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [isLooping, currentSong, error]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  const toggleLoop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLooping(!isLooping);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songDetails.length);
  };

  // const handlePrev = () => {
  //   setCurrentIndex(
  //     (prev) => (prev - 1 + songDetails.length) % songDetails.length
  //   );
  // };

  return (
    <div className="playlist-container">
      <audio ref={audioRef} src={currentSong.audio} />
      {error && (
        <div className="error-overlay">
          <div className="error-modal">
            <button className="close-error" onClick={() => setError(null)}>
              <FaTimes />
            </button>
            <h3>Playback Error</h3>
            <p>{error.message}</p>
            <p>Song: {error.song}</p>
            <div className="error-actions">
              <button onClick={error.onRetry}>Retry</button>
              <button
                onClick={() => {
                  setError(null);
                  handleNext();
                }}
              >
                Skip to Next
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="song-list">
        {songDetails.map((song, index) => {
          const isCurrent = index === currentIndex;

          return (
            <div
                  key={song.id}
                  ref={song}
              className={`song-item ${isCurrent ? "active" : ""} ${
                isCurrent && isPlaying ? "playing" : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
                togglePlay();
              }}
            >
              <div className="song-titles">{song.title}</div>

              <div className="song-controls">
                <button
                  className="play-button"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsPlaying(true);
                    togglePlay();
                  }}
                  aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
                >
                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <button
                  className={`loop-button ${isLooping ? "active" : ""}`}
                  onClick={(e) => toggleLoop(e)}
                  aria-label={isLooping ? "Disable loop" : "Enable loop"}
                >
                  <FaRedoAlt />
                </button>
              </div>

              {isCurrent && (
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
