import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import HomeScreen from './pages/HomeScreen.jsx';
import SongScreen from './pages/SongScreen.jsx';
import { createBrowserRouter, Ro } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
