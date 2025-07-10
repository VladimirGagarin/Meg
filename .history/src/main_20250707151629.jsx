import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import SongScreen from "./pages/SongScreen.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/pages/home" replace />, // App can be your layout with <Outlet />
  },
  {
    path: ""
  }
  {
    path: "*",
    element: <HomeScreen />, // fallback for any invalid URL
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
