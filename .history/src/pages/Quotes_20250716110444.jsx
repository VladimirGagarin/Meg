import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";
import { megImages } from "../components/SongDetails";
import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";
import song from "../assets/audios/impossible.mp3";
import "../components"

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
    <div className="quote-screen relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={currentImage}
        alt="Scene"
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        key={currentImage}
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl font-semibold mb-6">Sing with Magdalene</h1>
        <LyricsCard lyricText={currentLine} />

        {/* Custom Controls Only */}
        {audioRef.current && <Controls audio={audioRef} />}
      </div>
    </div>
  );
}
