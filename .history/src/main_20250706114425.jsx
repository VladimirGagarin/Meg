import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import HomeScreen from './pages/HomeScreen.jsx';
import SongScreen from './pages/SongScreen.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: "/pages/home",
    element: <HomeScreen />,
  },
  {
    path: "/pages/songs/:",
    element: <HomeScreen />,
  },
  {
    path: "/pages/app",
    element: <HomeScreen />,
  },
  {
    path: "*",
    element: <HomeScreen />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
