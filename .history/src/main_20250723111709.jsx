import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import SongScreen from "./pages/SongScreen.jsx";
import QuoteScreen from "./pages/Quotes.jsx";
import OfflinePage from "./pages/Offline.jsx";
import Playlist from "./pages/Playlist.jsx";
import AboutScreen from "./pages/AboutScreen.jsx";
import AboutScreenPerson from "./pages/AboutScreenPerson.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";

// ✅ Use createHashRouter (no more 404s on GitHub Pages)
const routes = createHashRouter([
  {
    path: "/",
    element: <App />, // Your main layout with <Outlet />
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "song/:id", element: <SongScreen /> },
      { path: "magdalene_quotes", element: <QuoteScreen /> },
      { path: "offline", element: <OfflinePage /> },
      { path: "playlist/:songId", element: <Playlist /> },
      { path: "playlist", element: <Playlist /> },
      {path: "song/", element:<Playlist/>}
    ],
  },
  {
    path: "/about",
    element:"<AboutScreen />, // Your About layout with <Outlet />
    children: [
      { index: true, element: <AboutPage /> },
      { path: "about/:id", element: <AboutScreenPerson /> },
      
    ]
  },
  {
    path: "*",
    element: <App />, // fallback route
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
