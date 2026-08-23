import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Paint from './paint'
import Outbreak from './outbreak'
import WeatherDuel from './weatherduel'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/paint",
    element: <Paint />,
  },
  {
    path: "/outbreak",
    element: <Outbreak />,
  },
  {
    path: "/weatherduel",
    element: <WeatherDuel />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)