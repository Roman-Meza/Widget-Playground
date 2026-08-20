import { useState } from 'react'
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import appLogo from './assets/app-logo.png'
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
          <h2>Get started</h2>
          <p>
            Check out the paint app!
          </p>
        </div>
        <Link to="/paint">
          <button type="button" className="counter">
            Go to Paint App
          </button>
        </Link>
      </section>
    </>
  )
}

export default App
