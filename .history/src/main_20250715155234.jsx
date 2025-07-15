import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import SongScreen from "./pages/SongScreen.jsx";
import AboutScreen from "./components/"
import { createHashRouter, RouterProvider } from "react-router-dom";

// ✅ Use createHashRouter (no more 404s on GitHub Pages)
const routes = createHashRouter([
  {
    path: "/",
    element: <App />, // Your main layout with <Outlet />
    children: [
      { index: true, element: <HomeScreen /> }, // /#/ (home)
      { path: "song/:id", element: <SongScreen /> },
      { path: "about", element: <AboutScreen /> },
    ],
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
