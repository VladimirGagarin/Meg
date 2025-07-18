import {
  getLifeLyrics,
  beginningLyrics,
  IamMegLyrics,
  fightSongLyrics,
  swmLyrics,
  butterflyLyrics,
  HopeLyrics,
  DreamLyrics,
  DreamLyrics2,
  SimplicityLyrics,
  SingingBirdSongLyrics,
  WeKnowLyrics,
  VoiceLyrics,
  DilMeraLyrics,
  EveStarLyrics,
  RadioSongLyrics,
  LifeDancesLy,
  FYSongLyrics,
  softAnthemLyrics,
  AnthemLyrics,
  PhoenixSongLyrics,
  replayLy,
  etchedLyricsSong,
  whereLyrics,
  FiestaLyrics,
  emberLyrics,
  defenderLyrics,
  RosesOfRomeLyrics,
   ThenLyrics,
   EmpressSongLyrics,
   PocahontasLyrics,
   TakeMeLyrics
} from "./SongData";
import LifeSong from "../assets/audios/meg.mp3";
import BeginingSong from "../assets/audios/The beginning.mp3";
import IamMagdaleneSong from "../assets/audios/IamMagdalene.mp3";
import FightSong from "../assets/audios/Fight_song.mp3";
import SwmSong from "../assets/audios/swm.mp3";
import ButterflySong from "../assets/audios/butterfly.mp3";
import HopeSong from "../assets/audios/hope.mp3";
import DreamSong from "../assets/audios/dreams.mp3";
import DreamSong2 from "../assets/audios/dream.mp3";
import SimplicitySong from "../assets/audios/simplicity.mp3";
import SingingBirdSong from "../assets/audios/singing_bird.mp3";
import TunaimbaSong from "../assets/audios/tunaimba.mp3";
import VoiceSong from "../assets/audios/voice.mp3";
import DilMeraSong from "../assets/audios/mera.mp3";
import StarSong from "../assets/audios/star.mp3";
import RadioSong from "../assets/audios/radio.mp3";
import LifeDancesSong from "../assets/audios/life_dances.mp3";
import FYSong from "../assets/audios/Furaha_Yangu.mp3";
import SoftAnthemSong from "../assets/audios/soft_anthem.mp3";
import AnthemSong from "../assets/audios/anthem.mp3";
import PhoenixSong from "../assets/audios/phoenix.mp3";
import ReplaySong from "../assets/audios/replay.mp3";
import EtchedSong from "../assets/audios/etched.mp3";
import WhereSong from "../assets/audios/where.mp3";
import FiestaSong from "../assets/audios/Fiesta.mp3";
import EmberSong from "../assets/audios/Ember2.mp3";
import DefenderSong from "../assets/audios/defender.mp3";
import RosesAnthemAudio from "../assets/audios/roses.mp3";
import EmpressSong from "../assets/audios/Empress.mp3";
import ThenSong from "../assets/audios/then.mp3";
import Pocahontasong from "../assets/audios/pocahontas.mp3";
import TakeMesong 


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
import Img42 from "../assets/images/meg27.jpeg";
import Img43 from "../assets/images/meg26.jpeg";
import Img44 from "../assets/images/meg28.jpg";
import Img45 from "../assets/images/meg29.jpeg";
import Img46 from "../assets/images/meg30.jpeg";
import Img47 from "../assets/images/meg31.jpeg";
import Img48 from "../assets/images/meg32.jpeg";
import Img49 from "../assets/images/meg33.jpeg";
import Img50 from "../assets/images/meg34.jpeg";
import Img51 from "../assets/images/meg28.jpeg";
import Img52 from "../assets/images/meg35.jpeg";
import Img53 from "../assets/images/meg36.jpeg";
import Img54 from "../assets/images/meg40.png";
import Img55 from "../assets/images/meg41.png";
import Img56 from "../assets/images/meg42.png";

export const songDetails = [
  {
    id: "Sing_with_magdalene_song",
    title: "Sing With Magdalene",
    audio: SwmSong,
    lyrics: swmLyrics(),
  },
  {
    id: "anthem_song",
    title: "Anthem",
    audio: AnthemSong,
    lyrics: AnthemLyrics(),
  },
  {
    id: "Soft_anthem_song",
    title: "Anthem (soft version)",
    audio: SoftAnthemSong,
    lyrics: softAnthemLyrics(),
  },
  {
    id: "life",
    title: "A Life to Live",
    audio: LifeSong,
    lyrics: getLifeLyrics(),
  },
  {
    id: "beginning",
    title: "The Beginning",
    audio: BeginingSong,
    lyrics: beginningLyrics(),
  },

  {
    id: "iam-magdalene",
    title: "I Am Magdalene",
    audio: IamMagdaleneSong,
    lyrics: IamMegLyrics(),
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
    id: "hope_song",
    title: "Hope",
    audio: HopeSong,
    lyrics: HopeLyrics(),
  },
  {
    id: "dream_vocal_song",
    title: "Dream (vocal)",
    audio: DreamSong,
    lyrics: DreamLyrics(),
  },
  {
    id: "dream_choral_song",
    title: "Dream",
    audio: DreamSong2,
    lyrics: DreamLyrics2(),
  },
  {
    id: "simplicity_song",
    title: "Simplicity",
    audio: SimplicitySong,
    lyrics: SimplicityLyrics(),
  },
  {
    id: "singing_bird_song",
    title: "Singing Bird",
    audio: SingingBirdSong,
    lyrics: SingingBirdSongLyrics(),
  },
  {
    id: "we_know_song",
    title: "We know the song",
    audio: TunaimbaSong,
    lyrics: WeKnowLyrics(),
  },
  {
    id: "voice_we_all_want_song",
    title: "Voice we all want",
    audio: VoiceSong,
    lyrics: VoiceLyrics(),
  },
  {
    id: "mera_dil_song",
    title: "My heart dances",
    audio: DilMeraSong,
    lyrics: DilMeraLyrics(),
  },
  {
    id: "evening_star_song",
    title: "The evening star",
    audio: StarSong,
    lyrics: EveStarLyrics(),
  },
  {
    id: "radio_song",
    title: "The radio",
    audio: RadioSong,
    lyrics: RadioSongLyrics(),
  },
  {
    id: "life_dances_song",
    title: "Life dances",
    audio: LifeDancesSong,
    lyrics: LifeDancesLy(),
  },
  {
    id: "Furaha_yangu_song",
    title: "Furaha yangu",
    audio: FYSong,
    lyrics: FYSongLyrics(),
  },
  {
    id: "phoenix_song",
    title: "The Phoenix",
    audio: PhoenixSong,
    lyrics: PhoenixSongLyrics(),
  },
  {
    id: "replay_song",
    title: "Replay",
    audio: ReplaySong,
    lyrics: replayLy(),
  },
  {
    id: "etched_song",
    title: "Etched in our hearts",
    audio: EtchedSong,
    lyrics: etchedLyricsSong(),
  },
  {
    id: "where_song_lives",
    title: "Where songs live",
    audio: WhereSong,
    lyrics: whereLyrics(),
  },
  {
    id: "fiesta_song",
    title: "Fiesta",
    audio: FiestaSong,
    lyrics: FiestaLyrics(),
  },
  {
    id: "Ember_song",
    title: "Ember",
    audio: EmberSong,
    lyrics: emberLyrics(),
  },
  {
    id: "defender_song",
    title: "Defender number 5",
    audio: DefenderSong,
    lyrics: defenderLyrics(),
  },
  {
    id: "director_song",
    title: "From The Director",
    audio: RosesAnthemAudio,
    lyrics: RosesOfRomeLyrics(),
  },
  {
    id: "empress_song",
    title: "Empress",
    audio: EmpressSong,
    lyrics: EmpressSongLyrics(),
  },
  {
    id: "then_song",
    title: "Then and Only then...",
    audio: ThenSong,
    lyrics: ThenLyrics(),
  },
  {
    id: "pocahontas_song",
    title: "Pocahontas",
    audio: Pocahontasong,
    lyrics: PocahontasLyrics(),
  },
  {
    id: "take_me_to_your_heart_song",
    title: "To your Heart",
    audio: TakeMesong,
    lyrics: TakeMeLyrics(),
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
  Img54,
  Img55,
  Img56,
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
  Img41,
  Img42,
  Img43,
  Img44,
  Img45,
  Img46,
  Img47,
  Img48,
  Img49,
  Img50,
  Img51,
  Img52,
  Img53,
];
