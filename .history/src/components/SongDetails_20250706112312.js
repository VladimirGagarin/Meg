import { getLifeLyrics, beginningLyrics, } from "./SongData";



export const songDetails = [
  {
    id: "life",
    title: "A Life to Live",
    audio: "/assets/life.mp3",
    cover: "/assets/life_cover.jpg",
    lyrics: getLifeLyrics(), // call the function here
  },
  {
    id: "beginning",
    title: "The Beginning",
    audio: "/assets/beginning.mp3",
    cover: "/assets/beginning_cover.jpg",
    lyrics: beginningLyrics(), // call the function here
  },
  // Add more songs the same way
];