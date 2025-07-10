import { getLifeLyrics, beginningLyrics, } from "./SongData";



export const songDetails = [
  {
    id: "life",
    title: "A Life to Live",
    audio: "/assets/audios/meg.mp3",
    lyrics: getLifeLyrics(), // call the function here
  },
  {
    id: "beginning",
    title: "The Beginning",
    audio: "/assets/beginning.mp3",
    lyrics: beginningLyrics(), // call the function here
  },
  // Add more songs the same way
];