import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {ScrollToTopBtn,scrollToTop} from './scrolltotop'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import appLogo from './assets/app-logo.png'
import paintLogo from './assets/paint/logo.png'
import outbreakLogo from './assets/outbreak/logo.png'
import weatherLogo from  './assets/weatherduel/logo.png'
import chromaLogo from './assets/chromaflash/logo.png'
import tvLogo from './assets/infinitelly/logo.png'
import numberLogo from './assets/numbermania/logo.png'
import paintDemo from './demovids/paintdemo.mp4'
import outbreakDemo from './demovids/outbreakdemo.mp4'
import weatherDemo from './demovids/weatherdemo.mp4'
import chromaDemo from './demovids/chromademo.mp4'
import tvDemo from './demovids/tvdemo.mp4'
import numberDemo from './demovids/numberdemo.mp4'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const LearnMore = useRef(null);
  const DevTeam = useRef(null);
  const AppMenu = useRef(null);
  const scrollToSection = (sectionName) => {
    sectionName.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="center">
        <div>
          <h1>Welcome to</h1>
          <img src={appLogo} className="logo" alt="App logo" />
        </div>
        <hr />
        <div>
          
          <button type="button" className="counter" onClick={() => scrollToSection(LearnMore)}>What's This Site?</button>
          <button type="button" className="counter" onClick={() => scrollToSection(DevTeam)}>Meet the Team</button>
          <button type="button" className="counter" onClick={() => scrollToSection(AppMenu)}>Jump to Apps</button>
          
        </div>
        <hr />
      </section>
      <section id="center" ref={LearnMore}>
        <h2>What is Widget Playground?</h2>
        <div className='learnmore'>
        <p className='appinfo'>Widget Playground is a collaborative portfolio made with Vite and React.<br />
        It was created by four Computer Science students and includes 6 web apps to enjoy.<br />
        Each app was developed by a single team member and compiled into this site.<br /> Scroll down to explore them!
        </p>
        <div>
          <img src={viteLogo} className='framework-logo'></img>
          <img src={reactLogo}className='framework-logo'></img>
        </div>
        </div>
        <hr />
      </section>
      <section id="center" ref={DevTeam}>
        <h2>Meet the Development Team!</h2>
        <div className="devtable">
          <div className="devrow">
            <div className="app-card">
              <div>
              <img className="devphoto" src="https://media.licdn.com/dms/image/v2/D4D03AQFKZ0c_jXBT5g/profile-displayphoto-shrink_800_800/B4DZS9gLFZG4Ak-/0/1738346115801?e=1790812800&v=beta&t=oKdBahGVQSrMpqVCZrislu4XTWOn8BQuzea1o92lQYg" />
              </div><h2>Jose Alanis</h2>
              <a href="https://www.linkedin.com/in/jose-arturo-alanis-vega-76b8b934a/">Visit LinkedIn Page</a>
            </div>
            <div className="app-card">
              <div>
              <img className="devphoto" src="https://media.licdn.com/dms/image/v2/D5603AQF40aK12CQw6A/profile-displayphoto-crop_800_800/B56ZfPM87nG0AI-/0/1751527969057?e=1790812800&v=beta&t=eesrF0fEE5oF8D2d07u-WhODauXCUhwOiJ5CfJqlU70" />
              </div><h2>Juan Gil</h2>
              <a href="https://www.linkedin.com/in/juan-c-gil-8481ba2ba/">Visit LinkedIn Page</a>
            </div>
          </div>
          <div className="devrow">
            <div className="app-card">
              <div>
              <img className="devphoto" src="https://media.licdn.com/dms/image/v2/D4E03AQG43Mb4j7zaDA/profile-displayphoto-crop_800_800/B4EZ3VjAaIJoAI-/0/1777404227955?e=1790812800&v=beta&t=R6EMjEmBOMe7dz5b8IBUz2CnRn93TTRYryiwUwgVtns" />
              </div><h2>Roman Meza</h2>
              <a href="https://www.linkedin.com/in/roman-meza-12980334a">Visit LinkedIn Page</a>
            </div>
            <div className="app-card">
              <div>
              <img className="devphoto" src="https://media.licdn.com/dms/image/v2/D5635AQFm5HBOrYjDRA/profile-framedphoto-shrink_800_800/B56ZniTjHbJoAg-/0/1760438399745?e=1789887600&v=beta&t=tmKXorAFkKNDyIf4pMI3Fx3e8dsySThN8TSCNCIOjxM" />
              </div><h2>Josecarlo Porchas</h2>
              <a href="https://www.linkedin.com/in/josecarlo-p-896242334/">Visit LinkedIn Page</a>
            </div>
          </div>
        </div>
        <hr />
      </section>
      <section id="next-steps" ref={AppMenu}>
        <div>
          <h2>Browse our web apps:</h2>
        </div>
        <div className='single-app'>
          <div className="app-card">
            <div className='cardlogo'> 
            <img src={paintLogo} className="applogo" alt="Paint logo" /></div>
            <p>
              A simple drawing app with customizable brush sizes and colors.< br/>< br/>
              Unleash your creativity and doodle to your heart's content!< br/>< br/>
              <Link to="/paint">
            <button type="button" className="counter" onClick={() => scrollToTop()}>
              Load SimplePaint
            </button>
          </Link>
          </p>
          </div>
          <div className='demovid'>
            <h3>Watch the demo below:</h3>
            <video autoPlay loop muted playsInline>
              <source src={paintDemo} type="video/mp4" />
            </video></div>
        </div>
        <div className='single-app'>
          <div className='demovid'>
            <h3>Watch the demo below:</h3>
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
          <button type="button" className="counter" onClick={() => scrollToTop()}>
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
          <button type="button" className="counter" onClick={() => scrollToTop()}>
            Load Weather Duel
          </button>
        </Link>
        </p>
        </div>
        <div className='demovid'>
            <h3>Watch the demo below:</h3>
            <video autoPlay loop muted playsInline>
              <source src={weatherDemo} type="video/mp4" />
            </video></div>
        </div>
        <div className='single-app'>
          <div className='demovid'>
            <h3>Watch the demo below:</h3>
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
          <button type="button" className="counter" onClick={() => scrollToTop()}>
            Load ChromaFlash
          </button>
        </Link>
        </p>
        </div>
        </div>

        <div className='single-app'>
        <div className="app-card">
          <div>
          <img src={tvLogo} className="applogo" alt="InfiniTube logo" /></div>
          <p>
            Wanna take a break but don't know what to watch?< br/>< br/>
            Tune into a slideshow of endless random images!< br/>< br/>
            <Link to="/infinitube">
          <button type="button" className="counter" onClick={() => scrollToTop()}>
            Load InfiniTube
          </button>
        </Link>
        </p>
        </div>
        <div className='demovid'>
            <h3>Watch the demo below:</h3>
            <video autoPlay loop muted playsInline>
              <source src={tvDemo} type="video/mp4" />
            </video></div>
        </div>

        <div className='single-app'>
          <div className='demovid'>
            <h3>Watch the demo below:</h3>
            <video autoPlay loop muted playsInline>
              <source src={numberDemo} type="video/mp4" />
            </video></div>
        <div className="app-card">
          <div>
          <img src={numberLogo} className="applogo" alt="Number Mania logo" />
          </div>
          <p>
            Test your arithmetic skills in this simple math game!< br/>< br/>
            Includes different difficulty levels and operations.< br/>< br/>
            <Link to="/numbermania">
          <button type="button" className="counter" onClick={() => scrollToTop()}>
            Load Number Mania
          </button>
        </Link>
        </p>
        </div>
        </div>
      </section>
      <div className='footer'>
        <h2>Questions? Contact us:</h2>
        <ul>
          <li><a href="mailto:alanisjose@cityuniversity.edu">alanisjose@cityuniversity.edu</a></li>
          <li><a href="mailto:giljuan@cityuniversity.edu">giljuan@cityuniversity.edu</a></li>
          <li><a href="mailto:mezaroman@cityuniversity.edu">mezaroman@cityuniversity.edu</a></li>
          <li><a href="mailto:porchasjosecarlo@cityuniversity.edu">porchasjosecarlo@cityuniversity.edu</a></li>
        </ul>
        <ScrollToTopBtn />
      </div>
    </>
  )
}

export default App
