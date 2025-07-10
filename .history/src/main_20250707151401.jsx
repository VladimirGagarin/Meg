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
    element: <App />, // App can be your layout with <Outlet />
    children: [
      { index: true, element: <HomeScreen /> }, // this is /
      { path: "song/:id", element: <SongScreen /> }, // this is /song/:id
    ],
  },
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
