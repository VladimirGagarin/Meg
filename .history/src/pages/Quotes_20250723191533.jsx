import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";

import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";
import song from "../assets/audios/impossible.mp3";
import "../pages/QuoteScreen.css";
import soccerPhoto1 from "../assets/images/meg6.jpg";
impo

export default function QuoteScreen() {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState("");
  const [currentImage, setCurrentImage] = useState(megImages[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
    const [audioReady, setAudioReady] = useState(false); // 👈 new state
    const [isShowingNotification, setIsShowingNotification] = useState(false);

  useEffect(() => {
    const audio = new Audio(song);
    audioRef.current = audio;
    const quotes = MagdaleneQuotes();
    // 👇 Initialize with the first lyric immediately
    setCurrentLine(quotes[0].text); 

    // When audio is ready to play
    audio.addEventListener("canplaythrough", () => {
      setAudioReady(true); // ✅ Set to true when ready
    });

   

    const updateQuote = () => {
      const currentTimeMs = audio.currentTime * 1000;
      const index = quotes.findIndex(
        (q) => currentTimeMs >= q.start && currentTimeMs <= q.end
      );
      if (index !== -1 && index !== quoteIndex) {
        setQuoteIndex(index);
        setCurrentLine(quotes[index].text);
        setCurrentImage(megImages[index % megImages.length]);
      }
    };

    audio.addEventListener("timeupdate", updateQuote);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateQuote);
    };
  }, []);

     const copyQuote = async () => {
       try {
         // Copy to clipboard
         await navigator.clipboard.writeText(currentLine);

         // Show notification
         setIsShowingNotification(true);

         // Hide after 3 seconds
         setTimeout(() => {
           setIsShowingNotification(false);
         }, 3000);
       } catch (err) {
         console.error("Failed to copy quote:", err);
         // Fallback for older browsers
         const textArea = document.createElement("textarea");
         textArea.value = currentLine;
         document.body.appendChild(textArea);
         textArea.select();
         document.execCommand("copy");
         document.body.removeChild(textArea);

         setIsShowingNotification(true);
         setTimeout(() => setIsShowingNotification(false), 3000);
       }
     };

  return (
    <div className="quote-screen">
      <img
        src={currentImage}
        alt="Scene"
        className="background-image"
        key={currentImage}
      />

      {/* Notification (fixed position) */}
      {isShowingNotification && (
        <div className="notification">Quote Copied!</div>
      )}

      <div onClick={copyQuote}>
        <LyricsCard
          lyricText={currentLine}
          currentLyricIndex={quoteIndex}
        />
      </div>

      {/* ✅ Only render Controls when audio is ready */}
      {audioReady && audioRef.current && <Controls audio={audioRef} />}
    </div>
  );
}
