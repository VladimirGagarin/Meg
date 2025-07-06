import React from "react";
import SongCard from "../components/SongCard";
import "./HomeScreen.css";



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
      ...Img29,
      ...Img30,
      ...Img31,
      ...Img32,
      ...Img33,
      ...Img34,
      ...Img35,
      ...Img36,
      ...Img37,
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
