// App.jsx
import { Outlet } from "react-router-dom";
import './'

export default function App() {
  return (
    <div className="fairy-shell">
      <h1 className="title">🎵 Sing With Magdalene 🎶</h1>
      <Outlet /> {/* This is where the page (Home or Song) will load */}
    </div>
  );
}
