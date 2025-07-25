// App.jsx
import { Outlet , Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';
import LogoText from "./assets/images/textLogo.png";
import { songDetails } from "./components/SongDetails";
import { FaArrowRight, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

export default function App() {
   const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const location = useLocation();
  const isInQuoteScreen = location.pathname === "/magdalene_quotes";
  const isInPlaylistScreen = location.pathname.startsWith("/playlist");
  const [online, setOnline] = useState(navigator.onLine);
  const allSongs = songDetails;
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [locationIsOffline, setLocationIsOffline] = useState(false)


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

  useEffect(() => {
    const isOfflinePath = location.pathname === "/offline";
    setLocationIsOffline(isOfflinePath);
    setOnline
  })

 useEffect(() => {
   const pathParts = location.pathname.split("/").filter(Boolean);
   const lastPart = pathParts[pathParts.length - 1];

   const possibleSong = allSongs.find((s) => s.id === lastPart);
   setCurrentSongTitle(possibleSong?.title || null);
 }, [location.pathname, allSongs]);

    useEffect(() => {
      const hasVisited = localStorage.getItem("hasVisitedSWM");
      const lastVisit = localStorage.getItem("lastVisitSWM");
      const now = new Date();
      const birthMonth = 2 // feb
      const birthDay = 16; // day
      const isBirthTime = now.getMonth() === birthMonth && now.getDate() === birthDay;  

      const isAlreadyOnAnthem = location.pathname === "/playlist/anthem_song";
      const isAlreadyOnWeKnow = location.pathname === "/playlist/we_know_song";
      const isAlreadyOnHbd = location.pathname === "/song/hbd_song";
      const goToHbd = "/song/hbd_song";

      if (isBirthTime && !isAlreadyOnHbd) {
        // If it's the birthday and not already on the HBD song page
        localStorage.setItem("hasVisitedSWM", "true");
        localStorage.setItem("lastVisitSWM", now.toISOString());
        navigate(goToHbd);
        return;
      }
      // If it's not the birthday, proceed with the regular flow
      if (isAlreadyOnHbd && !hasVisited) {
        // If already on the HBD song page, do nothing
        localStorage.setItem("hasVisitedSWM", "true");
        localStorage.setItem("lastVisitSWM", now.toISOString());
        return;
      }
      // Regular flow for first-time or returning visitors
      if (isAlreadyOnAnthem || isAlreadyOnWeKnow) {
        // If already on the Anthem or We Know song page, do nothing
        return;
      }
      // If not on any special page, check visit status
      if (isAlreadyOnHbd && hasVisited) {
        // If already on the HBD song page, do nothing
        return;
      }

      if (!hasVisited) {
        // First-time visitor
        localStorage.setItem("hasVisitedSWM", "true");
        localStorage.setItem("lastVisitSWM", now.toISOString());

        if (!isAlreadyOnAnthem) {
          navigate("/playlist/anthem_song");
        }
      } else {
        // Returning visitor
        if (lastVisit) {
          const lastDate = new Date(lastVisit);
          const daysPassed = Math.floor(
            (now - lastDate) / (1000 * 60 * 60 * 24)
          );

          if (daysPassed > 2 && !isAlreadyOnWeKnow) {
            localStorage.setItem("lastVisitSWM", now.toISOString()); // update the date
            navigate("/playlist/we_know_song");
          }
        } else {
          // If for some reason 'lastVisitSWM' is missing but 'hasVisitedSWM' exists
          localStorage.setItem("lastVisitSWM", now.toISOString());
        }
      }
    }, [navigate, location]);


  return (
    <div className="fairy-shell">
      {/* Show image if it loads, otherwise show h1 */}
      {imgLoaded && !imgError ? (
        <Link to="/" className="logo-link">
          <img
            src={LogoText}
            alt="Sing With Magdalene"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className="logo-img"
          />
        </Link>
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
      {online && (
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
      )}

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
      {/* 🎤 Dynamic Song Title if detected */}
      {currentSongTitle ? (
        <h1 className="animate-charcter">{currentSongTitle}</h1>
      ) : (
        <h1 className="animate-charcter">Sing With Magdalene</h1>
      )}

      {online && (
        <div className="nav-links">
          {isInPlaylistScreen ? (
            <Link to="/" className="nav-link">
              <FaArrowLeft className="icon" />
              <span>Go Home</span>
            </Link>
          ) : (
            <Link to="/playlist/Sing_with_magdalene_song" className="nav-link">
              <span>Jump to Playlist</span>
              <FaArrowRight className="icon" />
            </Link>
          )}

          <Link to="/about" className="nav-link">
            <span>About Magdalene</span>
            <FaExternalLinkAlt className="icon" />
          </Link>
        </div>
      )}

      {/* Main content area */}
      <Outlet />
     
    </div>
  );
}
