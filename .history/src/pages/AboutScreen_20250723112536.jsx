import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './About.css';

export default function AboutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [online, setOnline] = useState(navigator.onLine);

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
    
    if (!online) { 
        navigate("/offline");
        return null; // Prevent rendering while offline
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
        <Link
          to= "/" 
          className="apk-download"
        >
          {isInQuoteScreen ? "Home" : "Magdalene Quotes"}
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
