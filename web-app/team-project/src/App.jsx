import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import appLogo from './assets/app-logo.png'
import paintLogo from './assets/paint/logo.png'
import outbreakLogo from './assets/outbreak/logo.png'
import weatherLogo from  './assets/weatherduel/logo.png'
import chromaLogo from './assets/chromaflash/logo.png'
import paintDemo from './demovids/paintdemo.mp4'
import outbreakDemo from './demovids/outbreakdemo.mp4'
import weatherDemo from './demovids/weatherdemo.mp4'
import chromaDemo from './demovids/chromademo.mp4'
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
        <div className='single-app'>
          <div className="app-card">
            <div className='cardlogo'> 
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
          <div className='demovid'>
            <h2>Watch the demo below:</h2>
            <video autoPlay loop muted playsInline>
              <source src={paintDemo} type="video/mp4" />
            </video></div>
        </div>
        <div className='single-app'>
          <div className='demovid'>
            <h2>Watch the demo below:</h2>
            <video autoPlay loop muted playsInline>
              <source src={outbreakDemo} type="video/mp4" />
            </video></div>
        <div className="app-card">
          <div>
          <img src={outbreakLogo} className="applogo" alt="OutBreak logo" /></div>
          <p>
            A retro Breakout-style arcade game.< br/>< br/>
            Move the paddle with your mouse to break the blocks!< br/>< br/>
            <Link to="/outbreak">
          <button type="button" className="counter" onClick={resetScroll}>
            Load Outbreak
          </button>
        </Link>
        </p>
        </div>
        </div>
        <div className='single-app'>
        <div className="app-card">
          <div>
          <img src={weatherLogo} className="applogo" alt="Weather Duel logo" /></div>
          <p>
            Can you guess the weather correctly?< br/>< br/>
            Compare temperatures and humidity with real-time data!< br/>< br/>
            <Link to="/weatherduel">
          <button type="button" className="counter">
            Load Weather Duel
          </button>
        </Link>
        </p>
        </div>
        <div className='demovid'>
            <h2>Watch the demo below:</h2>
            <video autoPlay loop muted playsInline>
              <source src={weatherDemo} type="video/mp4" />
            </video></div>
        </div>
        <div className='single-app'>
          <div className='demovid'>
            <h2>Watch the demo below:</h2>
            <video autoPlay loop muted playsInline>
              <source src={chromaDemo} type="video/mp4" />
            </video></div>
        <div className="app-card">
          <div>
          <img src={chromaLogo} className="applogo" alt="ChromaFlash logo" />
          </div>
          <p>
            Memorize the color shown, then find it in a color wheel!< br/>< br/>
            How high can your streak go?< br/>< br/>
            <Link to="/chromaflash">
          <button type="button" className="counter">
            Load ChromaFlash
          </button>
        </Link>
        </p>
        </div>
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
