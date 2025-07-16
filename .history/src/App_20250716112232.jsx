// App.jsx
import { Outlet , Link, useParams} from "react-router-dom";
import { useState } from "react";
import './App.css';
import LogoText from "./assets/images/textLogo.png";

export default function App() {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHome, setIsHome] = useState(false);

  use

  return (
    <div className="fairy-shell">
      {/* Show image if it loads, otherwise show h1 */}
      {imgLoaded && !imgError ? (
        <img
          src={LogoText}
          alt="Sing With Magdalene"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className="logo-img"
        />
      ) : (
        <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      )}

      {/* Hidden image that loads in the background */}
      {!imgLoaded && !imgError && (
        <img
          src={LogoText}
          alt="hidden loader"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{ display: "none" }}
        />
      )}

      {/* APK Download Button */}
      <div className="links">
        <a
          href="https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.1/application-490c4c6a-8b27-4c78-a6c7-884413dabbfb.apk"
          className="apk-download"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </a>
        <Link to={"/magdalene_quotes"} className="apk-download">
          Magdalene Quotes
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
