import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import appLogo from './assets/app-logo.png'
import paintLogo from './assets/paint/logo.png'
import outbreakLogo from './assets/outbreak/logo.png'
import weatherLogo from  './assets/weatherduel/logo.png'
import chromaLogo from './assets/chromaflash/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Welcome to</h1>
          <img src={appLogo} className="logo" alt="App logo" />
        </div>
        <div>
          <h2>Browse our web apps:</h2>
        </div>
        
      </section>
      <section id="next-steps">
        
        <div className="app-card">
          <div> 
          <img src={paintLogo} className="applogo" alt="Paint logo" /></div>
          <p>
            A simple drawing app with customizable brush sizes and colors.< br/>< br/>
            Unleash your creativity and doodle to your heart's content!< br/>< br/>
            <Link to="/paint">
          <button type="button" className="counter" onClick={resetScroll}>
            Load SimplePaint
          </button>
        </Link>
        </p>
        </div>
        <div className="app-card">
          <div>
          <img src={outbreakLogo} className="applogo" alt="OutBreak logo" /></div>
          <p>
            A retro Breakout-style arcade game.< br/>< br/>
            Smash every block with your mouse-controlled paddle!< br/>< br/>
            <Link to="/outbreak">
          <button type="button" className="counter" onClick={resetScroll}>
            Load OutBreak
          </button>
        </Link>
        </p>
        </div>
        <div className="app-card">
          <div>
          <img src={weatherLogo} className="applogo" alt="Weather Duel logo" /></div>
          <p>
            Guess if the world is hotter or more humid than your city.< br/>< br/>
            Real weather data, streak-based Higher/Lower gameplay!< br/>< br/>
            <Link to="/weatherduel">
          <button type="button" className="counter">
            Load Weather Duel
          </button>
        </Link>
        </p>
        </div>
        <div className="app-card">
          <div>
          <img src={chromaLogo} className="applogo" alt="ChromaFlash logo" />
          </div>
          <p>
            Memorize a color, then click where it was on the wheel.< br/>< br/>
            Fast-paced color memory with a scoring streak!< br/>< br/>
            <Link to="/chromaflash">
          <button type="button" className="counter">
            Load ChromaFlash
          </button>
        </Link>
        </p>
        </div>
      </section>
    </>
  )
}

function resetScroll(){
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])
}

export default App
