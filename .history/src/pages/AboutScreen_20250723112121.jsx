import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './About.css';

export default function AboutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInQuoteScreen = location.pathname === "/magdalene_quotes";
  const isInPlaylistScreen = location.pathname.startsWith("/playlist");
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

  return (
    <div className="about-screen">
      <h1>About Magdalene Vision</h1>
      <p>This app is dedicated to the music and vision of Magdalene.</p>
      <Outlet />
    </div>
  );
}
