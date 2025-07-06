import { getLifeLyrics, beginningLyrics, } from "./SongData";
import  Life


export const songDetails = [
  {
    id: "life",
    title: "A Life to Live",
    audio: "",
    lyrics: getLifeLyrics(), // call the function here
  },
  {
    id: "beginning",
    title: "The Beginning",
    audio: "../assets/audios/The beginning.mp3",
    lyrics: beginningLyrics(), // call the function here
  },
  // Add more songs the same way
];