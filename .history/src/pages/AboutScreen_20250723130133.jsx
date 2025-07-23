import React from "react";
import { Outlet, Link,  useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import './About.css';

export default function AboutScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const isInAboutPersonScreen = location.pathname.includes("aboutPerson");    
 
    const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      setOnline(isOnline);
      if (!isOnline) navigate("/offline");
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [navigate]);

  const handleBack = () => {
  if (location.key !== "default") {
    // There is navigable history
    navigate(-1);
  } else {
    // No React Router history, go to /about
    navigate("/about");
  }
};

    
   
  if (!online) {
    return (
      <div className="offline-message">
        <h2>You are offline.</h2>
        <p>Please reconnect to view About Magdalene.</p>
      </div>
    );
  }


  return (
    <div className="about-screen">
      <h1>About Magdalene</h1>
      <p>This app is dedicated to the music and vision of Magdalene.</p>
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

        {isInAboutPersonScreen ? (
                <button className="apk-download" onClick={ handleBack()}>  Back </button>
        ) : (
          <Link to="/" className="apk-download">
            Home
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
}
