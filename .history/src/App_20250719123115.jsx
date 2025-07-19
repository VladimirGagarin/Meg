// App.jsx
import { Outlet , Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';
import LogoText from "./assets/images/textLogo.png";
import { songDetails } from "./components/SongDetails";

export default function App() {
   const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const location = useLocation();
  const isInQuoteScreen = location.pathname === "/magdalene_quotes";
  const [online, setOnline] = useState(navigator.onLine);
  const allSongs  = songDetails()


  useEffect(() => {
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
      if (!navigator.onLine) navigate("/offline");
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [navigate]);

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
        <Link
          to={isInQuoteScreen ? "/" : "/magdalene_quotes"}
          className="apk-download"
        >
          {isInQuoteScreen ? "Home" : "Magdalene Quotes"}
        </Link>
      </div>

      {!online && (
        <p className="offline-warning">
          You're offline. Some features may not work.<br></br>
          <a
            href="https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.1/application-490c4c6a-8b27-4c78-a6c7-884413dabbfb.apk"
            download
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "DDF700" }}
          >
            Download App
          </a>
        </p>
      )}
      <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      <Outlet />
    </div>
  );
}
