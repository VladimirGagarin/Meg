import React from "react";
import { Outlet, Link,  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './About.css';

export default function AboutScreen() {
    const navigate = useNavigate();
   const isInAboutPersonScreen =  window.location.pathname.startsWith("/about/aboutPerson");

 
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
                  <button className="apk-download" onClick={() => {
                      // if history.length > 1) {
                      if (history.length > 1) {
                          navigate(-1)
                          
                      }
                      else {
                            navigate("/about");
                      }
                  }}>
            Back
          </button>
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
