import { useState } from 'react'
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import appLogo from './assets/app-logo.png'
import paintLogo from './assets/paint/logo.png'
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
          <img src={paintLogo} className="paintlogo" alt="Paint logo" /></div>
          <p>
            A simple drawing app with customizable brush sizes and colors.< br/>< br/>
            Unleash your creativity and doodle to your heart's content!< br/>< br/>
            <Link to="/paint">
          <button type="button" className="counter">
            Load SimplePaint
          </button>
        </Link>
        </p>
        </div>
        <div className="app-card">
          <div>
          <div className="app-logo-placeholder" role="img" aria-label="OutBreak logo">🕹️</div></div>
          <p>
            A retro Breakout-style arcade game.< br/>< br/>
            Smash every block with your mouse-controlled paddle!< br/>< br/>
            <Link to="/outbreak">
          <button type="button" className="counter">
            Load OutBreak
          </button>
        </Link>
        </p>
        </div>
        <div className="app-card">
          <div>
          <div className="app-logo-placeholder" role="img" aria-label="Weather Duel logo">🌦️</div></div>
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
          <div className="app-logo-placeholder" role="img" aria-label="ChromaFlash logo">🌈</div></div>
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

export default App
