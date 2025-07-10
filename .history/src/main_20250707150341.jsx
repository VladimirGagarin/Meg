import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import SongScreen from "./pages/SongScreen.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/", // root layout
    element: <App />, // layout with <Outlet />
    children: [
      { index: true, element: <HomeScreen /> }, // path: "/"
      { path: "pages/song/:id", element: <SongScreen /> }, // path: "/pages/song/:id"
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
