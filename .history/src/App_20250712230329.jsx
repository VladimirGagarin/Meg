// App.jsx
import { Outlet } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div className="fairy-shell">
      <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      <p className="slogan">A Pilgrimage of Crescendos</p>

      {/* APK Download Button */}
      <a
        href="https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.0/application-ca23e58a-9cb0-4978-b2c8-30f61eb82993.apk"
        className="apk-download"
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        📲 Download Android App
      </a>

      <Outlet />
    </div>
  );
}
