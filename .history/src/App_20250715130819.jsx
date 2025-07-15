// App.jsx
import { Outlet } from "react-router-dom";
import './App.css';
import LogoText from "../assets/images/textLogo.png"

export default function App() {
  return (
    <div className="fairy-shell">
      <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      
      {/* APK Download Button */}
      <a
        href="https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.1/application-490c4c6a-8b27-4c78-a6c7-884413dabbfb.apk"
        className="apk-download"
        download
        target="_blank"
        rel="noopener noreferrer"
      >
         Download  App 
      </a>

      <Outlet />
    </div>
  );
}
