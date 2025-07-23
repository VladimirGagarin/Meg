import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";

import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";
import song from "../assets/audios/impossible.mp3";
import "../pages/QuoteScreen.css";
import soccerPhoto1 from "../assets/images/meg6.jpg";
import soccerPhoto2 from "../assets/images/meg7.jpg";
import soccerPhoto3 from "../assets/images/meg8.jpg";
import soccerPhoto4 from "../assets/images/meg37.jpeg";
import soccerPhoto5 from "../assets/images/meg38.jpeg";
import soccerPhoto6 from "../assets/images/meg39.jpeg";
import soccerPhoto7 from "../assets/images/meg40.jpeg";
import soccerPhoto8 from "../assets/images/meg41.jpeg";
import soccerPhoto9 from "../assets/images/meg42.jpeg";
import soccerPhoto10 from "../assets/images/meg43.jpeg";
import soccerPhoto11 from "../assets/images/meg44.jpeg";
import soccerPhoto12 from "../assets/images/meg45.jpeg";
import soccerPhoto13 from "../assets/images/meg46.jpeg";
import soccerPhoto14 from "../assets/images/meg47.jpeg";
import soccerPhoto15 from "../assets/images/meg48.jpeg";
import soccerPhoto16 from "../assets/images/meg49.jpeg";
import soccerPhoto17 from "../assets/images/meg50.jpeg";
import soccerPhoto18 from "../assets/images/meg51.jpeg";
import soccerPhoto19 from "../assets/images/meg52.jpeg";

export default function QuoteScreen() {
  const megImages = [soccerPhoto1, soccerPhoto2, soccerPhoto3, soccerPhoto4, soccerPhoto5, 
    soccerPhoto6, soccerPhoto7, soccerPhoto8, soccerPhoto9, soccerPhoto10,
    soccerPhoto11, soccerPhoto12, soccerPhoto13, soccerPhoto14, soccerPhoto15,
    soccerPhoto16, soccerPhoto17, soccerPhoto18, soccerPhoto19
  ];
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
         textArea.value = currentLine + "- by Magdalene";
         document.body.appendChild(textArea);
         textArea.select();
         document.execCommand("copy");
         document.body.removeChild(textArea);

         setIsShowingNotification(true);
         setTimeout(() => setIsShowingNotification(false), 3000);
       }
     };

       const generateSlices = () => {
    const slices = [];
    const totalSlices = 64; // 8x8

    for (let i = 0; i < totalSlices; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      const randomX = Math.random() * 100 - 50; // -50vw to 50vw
      const randomY = Math.random() * 100 - 50; // -50vh to 50vh
      const randomRotate = Math.random() * 360; // 0deg to 360deg

      slices.push(
        <div
          key={i}
          className="slice"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundPosition: `${(col / 7) * 100}% ${(row / 7) * 100}%`,
            transform: `translateX(${randomX}vw) translateY(${randomY}vh) rotate(${randomRotate}deg)`,
            transition: `all ${1 + Math.random()}s ease-out`,
          }}
        />
      );
    }
    return slices;
  };

  return (
    <div className="quote-screen">
      {generateSlices()}

      {/* Notification (fixed position) */}
      {isShowingNotification && (
        <div className="notification">Quote Copied! Inspire Others.</div>
      )}

      <div onClick={copyQuote}>
        <LyricsCard lyricText={currentLine} currentLyricIndex={quoteIndex} />
      </div>

      {/* ✅ Only render Controls when audio is ready */}
      {audioReady && audioRef.current && <Controls audio={audioRef} />}
    </div>
  );
}
