import React from "react";
import SongCard from "../components/SongCard";
import "./HomeScreen.css";
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


export default function HomeScreen() {
    const allPhotos = [
      ...Img1,
      ...Img2,
      ...Img3,
      ...Img4,
      ...Img5,
      ...Img6,
      ...Img7,
      ...Img8,
      ...Img9,
      ...Img10,
      ...Img12,
      ...Img13,
      ...Img14,
      ...Img15,
      ...Img16,
      ...Img17,
      ...Img18,
      ...Img19,
      ...Img20,
      ...Img21,
      ...Img22,
      ...Img23,
      ...Img24,
      ...Img25,
      ...Img26,
      ...Img27,
      ...Img28,
      ...Img,
      ...Img12,
      ...Img13,
      ...Img14,
      ...Img15,
      ...Img16,
      ...Img10,
      ...Img12,
      ...Img13,
      ...Img14,
      ...Img15,
      ...Img16,
    ];
  return (
    <div className="home-screen">
      
      <p className="subtitle">
        Enter a world of magical melodies and glowing lyrics
      </p>
      <SongCard />
    </div>
  );
}
