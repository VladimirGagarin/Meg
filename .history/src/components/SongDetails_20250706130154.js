import { getLifeLyrics, beginningLyrics, } from "./SongData";
import LifeSong from "./assets/audios/meg.mp3";
import BeginingSong from '../assets/audios/src/assets/audios/The beginning.mp3'


export const songDetails = [
  {
    id: "life",
    title: "A Life to Live",
    audio: LifeSong,
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