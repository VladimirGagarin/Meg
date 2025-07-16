import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";
import { megImages } from "../components/SongDetails";
import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";
import song from "../assets/audios/impossible.mp3";
import "../pages/QuoteScreen.css";

export default function QuoteScreen() {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState("");
  const [currentImage, setCurrentImage] = useState(megImages[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [audioReady, setAudioReady] = useState(false); // 👈 new state

  useEffect(() => {
    const audio = new Audio(song);
    audioRef.current = audio;

    // When audio is ready to play
    audio.addEventListener("canplaythrough", () => {
      setAudioReady(true); // ✅ Set to true when ready
    });

    const quotes = MagdaleneQuotes();

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
  }, );

  return (
    <div className="quote-screen">
      <img
        src={currentImage}
        alt="Scene"
        className="background-image"
        key={currentImage}
      />

      <LyricsCard lyricText={currentLine} />

      {/* ✅ Only render Controls when audio is ready */}
      {audioReady && audioRef.current && <Controls audio={audioRef} />}
    </div>
  );
}
