import { useRef, useEffect, useState } from "react";
import { MagdaleneQuotes } from "../components/SongData";
import { megImages } from "../components/SongDetails";
import song from "../assets/audios/impossible.mp3";
import Controls from "../components/Controls";
import LyricsCard from "../components/lyricsCard";

export function QuoteScreen() {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState("");
  const [currentImage, setCurrentImage] = useState(megImages[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const quotes = MagdaleneQuotes();

    const updateQuote = () => {
      const currentTimeMs = audio.currentTime * 1000;
      const index = quotes.findIndex(
        (q) => currentTimeMs >= q.start && currentTimeMs <= q.end
      );
      if (index !== -1 && index !== quoteIndex) {
        setQuoteIndex(index);
        setCurrentLine(quotes[index].text);
        setCurrentImage(megImages[index % megImages.length]); // loop images if quotes > images
      }
    };

    audio.addEventListener("timeupdate", updateQuote);
    return () => audio.removeEventListener("timeupdate", updateQuote);
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

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Sing with Magdalene
        </h1>
        <LyricsCard lyricText={currentLine} />
        <audio
          ref={audioRef}
          src={song}
          controls
          className="mt-8 w-full max-w-md"
        />
        {audioRef.current?.src && <Controls audio={audioRef} />}
      </div>
    </div>
  );
}
