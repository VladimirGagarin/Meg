// App.jsx
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="fairy-shell">
      <h1>🎵 Sing With Magdalene</h1>
      <Outlet /> {/* This is where the page (Home or Song) will load */}
    </div>
  );
}
