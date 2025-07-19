import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songDetails } from "../components/SongDetails";
import { FaPlay, FaPause, FaTimes, FaSyncAlt, FaRetweet } from "react-icons/fa";
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
    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
      setCurrentSong(songDetails[currentIndex])
      if (!currentSong) {
        navigate("/playlist/Sing_with_magdalene_song");
      }
    }, [currentIndex, currentSong, navigate]);
   

  useEffect(() => {
    if (songId) {
      const index = songDetails.findIndex((song) => song.id === songId);
      if (index !== -1) setCurrentIndex(index);
      setIsPlaying(true);
    } else {
      navigate("/playlist/Sing_with_magdalene_song");
    }
  }, [songId, navigate]);


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
      if (songItem.current) {
        songItem.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [currentIndex]);



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

  

    const toggleLoop = (e, isCurrent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCurrent) {
        // Only toggle if it's the current song
        setIsLooping(!isLooping);
      }
    };


  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songDetails.length);
  };

  
  return (
    <div className="playlist-container">
      <audio ref={audioRef} src={currentSong.audio} loop={isLooping} />

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
              ref={isCurrent ? songItem : null}
              className={`song-item ${isCurrent ? "active" : ""} ${
                isCurrent && isPlaying ? "playing" : ""
              }`}
              onClick={() => {
                if (index !== currentIndex) {
                  setCurrentIndex(index);
                } else {
                  // If it's the current song, toggle play/pause
                  const audio = audioRef.current;
                  if (!audio) return;
                  if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                  } else {
                    audio.play();
                    setIsPlaying(true);
                  }
                }
              }}
            >
              <div className="song-titles">{song.title}</div>

              <div className="song-controls">
                <button
                  className="play-button"
                  onClick={() => {
                    if (index !== currentIndex) {
                      setCurrentIndex(index);
                    } else {
                      // If it's the current song, toggle play/pause
                      const audio = audioRef.current;
                      if (!audio) return;
                      if (isPlaying) {
                        audio.pause();
                        setIsPlaying(false);
                      } else {
                        audio.play();
                        setIsPlaying(true);
                      }
                    }
                  }}
                  aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
                >
                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <button
                  className={`loop-button ${
                    isLooping && isCurrent ? "active" : ""
                  }`}
                  onClick={(e) => toggleLoop(e, isCurrent)}
                  aria-label={isLooping ? "Disable loop" : "Enable loop"}
                >
                  {isLooping && isCurrent ? (
                    <FaSyncAlt className="spin" />
                  ) : (
                    <FaRetweet />
                  )}
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
