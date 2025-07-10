import { getLifeLyrics, beginningLyrics, IamMegLyrics, fightSongLyrics, swmLyrics, butterflyLyrics, HopeLyrics} from "./SongData";
import LifeSong from "../assets/audios/meg.mp3";
import BeginingSong from '../assets/audios/The beginning.mp3';
import IamMagdaleneSong from "../assets/audios/IamMagdalene.mp3";
import FightSong from "../assets/audios/Fight_song.mp3";
import SwmSong from "../assets/audios/Swm.mp3";
import ButterflySong from "../assets/audios/butterfly.mp3";
import HopeSong from "../assets/audios/hope.mp3"

import Img1 from "../assets/images/belle.jpeg";
import Img2 from "../assets/images/belle2.jpg";
import Img3 from "../assets/images/meg1.jpg";
import Img4 from "../assets/images/meg2.jpg";
import Img5 from "../assets/images/meg3.jpg";
import Img6 from "../assets/images/meg4.jpg";
import Img7 from "../assets/images/meg5.jpg";
import Img8 from "../assets/images/meg6.jpg";
import Img9 from "../assets/images/meg7.jpg";
import Img10 from "../assets/images/meg8.jpg";
import Img12 from "../assets/images/meg10.jpg";
import Img13 from "../assets/images/meg11.jpg";
import Img14 from "../assets/images/meg12.jpg";
import Img15 from "../assets/images/meg13.jpeg";
import Img16 from "../assets/images/meg14.jpeg";
import Img17 from "../assets/images/meg15.jpeg";
import Img18 from "../assets/images/meg19.jpeg";
import Img19 from "../assets/images/meg20.jpeg";
import Img20 from "../assets/images/meg23.jpeg";
import Img21 from "../assets/images/quuen.jpeg";
import Img22 from "../assets/images/meg24.jpeg";
import Img23 from "../assets/images/toon1.jpeg";
import Img24 from "../assets/images/toon2.jpg";
import Img25 from "../assets/images/toon3.jpg";
import Img26 from "../assets/images/toon4.jpg";
import Img27 from "../assets/images/toon1.png";
import Img28 from "../assets/images/toon2.png";
import Img29 from "../assets/images/toon3.png";
import Img30 from "../assets/images/toon4.png";
import Img31 from "../assets/images/toon5.jpg";
import Img32 from "../assets/images/toon5.png";
import Img33 from "../assets/images/toon6.png";
import Img34 from "../assets/images/toon7.png";
import Img35 from "../assets/images/toon8.png";
import Img36 from "../assets/images/toon10.jpg";
import Img37 from "../assets/images/toon11.jpg";
import Img38 from "../assets/images/meg16.jpeg";
import Img39 from "../assets/images/meg17.jpeg";
import Img40 from "../assets/images/meg18.jpeg";
import Img41 from "../assets/images/meg25.jpeg";
import Img42 from  "../assets/images/meg27.jpeg"
import Img43 from "../assets/images/meg26.jpeg";



export const songDetails = [
  {
    id: "Sing_with_magdalene",
    title: "Sing With Magdalene",
    audio: SwmSong,
    lyrics: swmLyrics(), // call the function here
  },
  {
    id: "life",
    title: "A Life to Live",
    audio: LifeSong,
    lyrics: getLifeLyrics(), // call the function here
  },
  {
    id: "beginning",
    title: "The Beginning",
    audio: BeginingSong,
    lyrics: beginningLyrics(), // call the function here
  },
  // Add more songs the same way
  {
    id: "iam-magdalene",
    title: "I Am Magdalene",
    audio: IamMagdaleneSong,
    lyrics: IamMegLyrics(), // this should return the lyrics in { start, end, text } format
  },
  {
    id: "fight_song",
    title: "Fight Song",
    audio: FightSong,
    lyrics: fightSongLyrics(),
  },
  {
    id: "butterfly_wings_song",
    title: "Scribbled Sonnet",
    audio: ButterflySong,
    lyrics: butterflyLyrics(),
  },
  {
    id: "hopes_song",
    title: "Scribbled Sonnet",
    audio: ButterflySong,
    lyrics: butterflyLyrics(),
  },
];


export const megImages = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
  Img10,
  Img12,
  Img13,
  Img14,
  Img15,
  Img16,
  Img17,
  Img18,
  Img19,
  Img20,
  Img21,
  Img22,
  Img23,
  Img24,
  Img25,
  Img26,
  Img27,
  Img28,
  Img29,
  Img30,
  Img31,
  Img32,
  Img33,
  Img34,
  Img35,
  Img36,
  Img37,
  Img38,
  Img39,
  Img40,
  Img41
];
  