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
    element: <Navigate to="/pages/home" replace />, // redirect root to /pages/home
  },
  {
    path: "/pages/home",
    element: <App />, // layout component with <Outlet />
    children: [
      { index: true, element: <HomeScreen /> }, // renders at /pages/home
      { path: "../song/:id", element: <SongScreen /> }, // resolves to /pages/song/:id
    ],
  },
  {
    path: "*", // catch all unmatched routes
    element: <NotFound />, // or redirect to "/"
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
