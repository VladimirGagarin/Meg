import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import HomeScreen from './pages/HomeScreen.jsx';
import SongScreen from './pages/SongScreen.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = createBrowserRouter([{

}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
