import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";
import { megImages } from "../components/SongDetails";
import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";
import song from "../assets/audios/impossible.mp3";
import "../pages/QuoteScreen.css"

export default function QuoteScreen() {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState("");
  const [currentImage, setCurrentImage] = useState(megImages[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio(song);
    audioRef.current = audio;

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
  }, [quoteIndex]);

  return (
    <div className="quote-screen">
      <img
        src={currentImage}
        alt="Scene"
        className="background-image"
        key={currentImage}
      />

      <div className="overlay">
       
      </div>
    </div>
  );
}
