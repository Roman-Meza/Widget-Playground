import logo from "../assets/numbermania/logo.png"

function Home({ onStart }) {
  return (
    <div className="card home">

      <img className="applogo" src={logo} />

      <p>
        Solve as many math problems as you can
        without making a mistake.
      </p>

      <button onClick={onStart}>Start Game</button>
    </div>
  );
}

export default Home;