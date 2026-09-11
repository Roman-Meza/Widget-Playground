import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Paint from './paint'
import Outbreak from './outbreak'
import WeatherDuel from './weatherduel'
import ChromaFlash from './chromaflash'
import Infinitelly from './infinitelly'
import MathQuiz from './mathquiz'

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
  {
    path: "/chromaflash",
    element: <ChromaFlash />,
  },
  {
    path: "/infinitube",
    element: <Infinitelly />,
  },
  {
    path: "/numbermania",
    element: <MathQuiz />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)