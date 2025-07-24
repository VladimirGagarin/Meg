import Controls from "../components/Controls";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { songDetails, megImages } from "../components/SongDetails";
import LyricsCard from "../components/lyricsCard";
import LogoImage from "../assets/images/belle.png";
import SonnetSong from "../assets/audios/sonnet.mp3";
import { SonnetLyrics } from "../components/SongData";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import RORImage from "../assets/images/ror.png";

import "./SongScreen.css";

export default function SongScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSongObj, setCurrentSongObj] = useState(null);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(LogoImage);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const PREMIUM_PASSWORD = "moonlightsonata";
  const songScreenRef = useRef(null);
  const [showSonnetModalConfim, setshowSonnetModalConfim] = useState(false);
   const [showSonnetModal, setshowSonnetModal] = useState(false);
  const sonnetAudioRef = useRef(new Audio(SonnetSong)); 
  const [isPlayingSonnet, setIsPlayingSonnet] = useState(false);
  const [currentSonnetLyricIndex, setSonnetLyricIndex] = useState(0);
 


  
  useEffect(() => {
    songScreenRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSongObj]);

   useEffect(() => {
     // Initialize sonnet audio
     const sonnetAudio = sonnetAudioRef.current;
     sonnetAudio.loop = true; // Set loop here if needed
     sonnetAudio.preload = "auto";

     return () => {
       sonnetAudio.pause();
     };
   }, []);

  useEffect(() => {
    if (currentSongObj) {
      document.title = `${currentSongObj.title} | Sing With Magdalene`;
    } else {
      document.title = "Sing With Magdalene";
    }

    return () => {
      document.title = "Sing With Magdalene";
    };
  }, [currentSongObj]);

  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");

    if (currentSongObj && metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Listen to '${currentSongObj.title}' — an inspiring piece from Sing With Magdalene. Spiritual, moving, and unforgettable.`
      );
    } else if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Sing With Magdalene is a lyrical experience. Explore spiritual songs with synced lyrics and magical visuals."
      );
    }

    return () => {
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Sing With Magdalene is a lyrical experience. Explore spiritual songs with synced lyrics and magical visuals."
        );
      }
    };
  }, [currentSongObj]);


  const audioRef = useRef(new Audio());

  useEffect(() => {
    const song = songDetails.find((s) => s.id === id);
    if (!song) {
      navigate(-1);
      return;
    }

    setCurrentSongObj(song);
    const audio = audioRef.current;
    audio.src = song.audio;
    audio.preload = "auto";

    // 👉 Determine if this song is the director's song
    const isFromDirector = song.id === "director_song";

    // ✅ Only loop if it's NOT from director
    audio.loop = !isFromDirector;

    // Set initial random image
    const randomImage = megImages[Math.floor(Math.random() * megImages.length)];
    setCurrentImage(randomImage);

    if (isFromDirector) {
      setTimeout(() => {setshowSonnetModalConfim(true)}, 4000)
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [id, navigate]);

  // Lyric and image sync based on audio timeupdate event
  useEffect(() => {
    if (!currentSongObj || !audioRef.current) return;

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      const currentTimeMs = audio.currentTime * 1000;
      let newIndex = -1;

      // Iterate through lyrics to find the current one
      for (let i = 0; i < currentSongObj.lyrics.length; i++) {
        const line = currentSongObj.lyrics[i];

        // For all lines except the last one, use the strict < line.end
        if (i < currentSongObj.lyrics.length - 1) {
          if (currentTimeMs >= line.start && currentTimeMs < line.end) {
            newIndex = i;
            break;
          }
        } else {
          // For the very last line, allow it to be shown until the end of the song
          // or until its designated end time.
          if (currentTimeMs >= line.start && currentTimeMs <= line.end) {
            newIndex = i;
            break;
          }
          // Fallback for the very end of the song if lyric.end is slightly off
          // If we are at the end of the song and no lyric matched, assume it's the last one
          if (i === currentSongObj.lyrics.length - 1 && audio.ended) {
            newIndex = i; // Ensure last lyric remains visible when song ends
            break;
          }
        }
      }

      // If no lyric is active but the audio is still playing after all lyrics,
      // and it's the last lyric, ensure it stays active.
      // This handles cases where the lyric.end might be slightly before the song ends.
      if (
        newIndex === -1 &&
        audio.currentTime * 1000 >=
          currentSongObj.lyrics[currentSongObj.lyrics.length - 1].start
      ) {
        newIndex = currentSongObj.lyrics.length - 1;
      }

      if (newIndex !== -1 && newIndex !== currentLyricIndex) {
        setCurrentLyricIndex(newIndex);
        const randomImage =
          megImages[Math.floor(Math.random() * megImages.length)];
        setCurrentImage(randomImage);
      }
    };

    const onEnded = () => {
     setCurrentLyricIndex(0); // reset the lyrics line
      const isFromDirector = currentSongObj.id === "director_song";
      if (isFromDirector) {
        setshowSonnetModalConfim(true);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
     audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [currentSongObj, currentLyricIndex]);


   useEffect(() => {
     if (!showSonnetModal) return;

     const sonnetAudio = sonnetAudioRef.current;
  const mainAudio = audioRef.current; 
     const lyrics = SonnetLyrics();

     // Auto-play with error handling
     const playSonnet = async () => {
       try {
          if (mainAudio && !mainAudio.paused) {
            mainAudio.pause();
          }
         await sonnetAudio.play();
         setIsPlayingSonnet(true);
       } catch (err) {
         console.error("Autoplay failed:", err);
         // Fallback: Show play button instead
         setIsPlayingSonnet(false);
       }
     };

     playSonnet();

     const updateSonnetLyrics = () => {
       const currentTimeMs = sonnetAudio.currentTime * 1000;
       let newIndex = -1;

       for (let i = 0; i < lyrics.length; i++) {
         const line = lyrics[i];
         if (i < lyrics.length - 1) {
           if (currentTimeMs >= line.start && currentTimeMs < line.end) {
             newIndex = i;
             break;
           }
         } else {
           if (currentTimeMs >= line.start) {
             newIndex = i;
             break;
           }
         }
       }

       if (newIndex !== -1 && newIndex !== currentSonnetLyricIndex) {
         setSonnetLyricIndex(newIndex);
       }
     };

     const handleSonnetEnded = () => {
       setIsPlayingSonnet(false);
       setSonnetLyricIndex(0); // Reset to first lyric
       // Optional: Add any additional end-of-sonnet logic here
     };

     sonnetAudio.addEventListener("timeupdate", updateSonnetLyrics);
     sonnetAudio.addEventListener("ended", handleSonnetEnded);
     return () => {
       sonnetAudio.removeEventListener("timeupdate", updateSonnetLyrics);
       sonnetAudio.removeEventListener("ended", handleSonnetEnded);
     };
   }, [showSonnetModal, currentSonnetLyricIndex]);

  if (!currentSongObj) {
    return <div className="loading">Magdalene is almost there — Just a moment...</div>;
  }

  const currentLine = currentSongObj.lyrics[currentLyricIndex]?.text || "Sing With Magdalene";

  const showContext = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === PREMIUM_PASSWORD) {
      setIsVerified(true);
    } else {
      alert("Incorrect password. Try again.");
    }
  };

  const closeSonnetModalConfirm = () => {
    setshowSonnetModalConfim(false)
  }
   
  const handleSonnetsong = () => {
    closeSonnetModalConfirm(false);
    setshowSonnetModal(true);
    
  };

    const toggleSonnetPlay = () => {
      const sonnetAudio = sonnetAudioRef.current;

      if (isPlayingSonnet) {
        sonnetAudio.pause();
      } else {
        sonnetAudio.play().catch((error) => {
          console.error("Audio play failed:", error);
        });
      }
      setIsPlayingSonnet(!isPlayingSonnet);
    };

   const closeSonnetModal = () => {
     sonnetAudioRef.current.pause(); // Stop playback
     sonnetAudioRef.current.currentTime = 0; // Rewind to start
     setIsPlayingSonnet(false); // Update state
     setSonnetLyricIndex(0); // Reset lyrics
     setshowSonnetModal(false); // Close modal
   };


  return (
    <div className="song-screen" ref={songScreenRef}>
      <div className="image-container" onDoubleClick={() => setShowModal(true)}>
        <img
          src={currentImage}
          key={currentImage}
          alt="Visual representation"
          className="song-image"
          onError={() => setCurrentImage(LogoImage)}
          onContextMenu={(e) => showContext(e)}
        />
        <div className="song-title">
      </div>

      <LyricsCard
        lyricText={currentLine}
        currentLyricIndex={currentLyricIndex}
      />

      {/* Pass audioRef to Controls to handle play/mute/progress */}
      {audioRef.current?.src && (
        <Controls audio={audioRef} hideNext={false} id={id} />
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Premium Download</h2>
            {!isVerified ? (
              <p>
                This melody rests behind a sacred veil.
                <br />
                Whisper the password Magdalene gave you,
                <br />
                and the treasures shall unfold.
              </p>
            ) : (
              <p
                style={{
                  fontStyle: "italic",
                  color: "#e6d6f7",
                  marginTop: "1rem",
                }}
              >
                🌸 Ah, Magdalene has gave you — welcome.
              </p>
            )}

            {!isVerified ? (
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />
                <button type="submit" className="verify-button">
                  Unlock
                </button>
              </form>
            ) : (
              <div className="download-options">
                <a
                  href={currentImage}
                  download
                  className="download-button"
                  onClick={closeModal}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Image
                </a>

                {audioRef.current?.src && (
                  <a
                    href={audioRef.current.src}
                    download
                    className="download-button"
                    onClick={closeModal}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download song
                  </a>
                )}
              </div>
            )}

            <button className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showSonnetModalConfim && (
        <div className="modal-overlay">
          <div className="sonnet-modal">
            <h2>A Gentle Confirmation</h2>
            <p>Would you like to listen original version from Roses Of Rome?</p>
            <div className="modal-buttons">
              <button className="yes-btn" onClick={handleSonnetsong}>
                Yes, I do
              </button>
              <button className="no-btn" onClick={closeSonnetModalConfirm}>
                No, not now
              </button>
            </div>
          </div>
        </div>
      )}
      {showSonnetModal && (
        <div className="Sonnet-overlay">
          <div className="Sonnet-content">
            <img src={RORImage} alt="Roses Of Rome Logo" />
            <div className="Controls">
              <button onClick={toggleSonnetPlay}>
                {isPlayingSonnet ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={closeSonnetModal}>
                <FaTimes />
              </button>
            </div>
            <div className="lyrics-sonnet">
              {SonnetLyrics()[currentSonnetLyricIndex]?.text ||
                "A Sonnet is Playing..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
