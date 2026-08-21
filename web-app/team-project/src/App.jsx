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
      </section>
    </>
  )
}

export default App
