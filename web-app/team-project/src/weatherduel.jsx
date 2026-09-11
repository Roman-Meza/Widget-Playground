import './weatherduel.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import worldCities from './data/worldCities';
import weatherLogo from  './assets/weatherduel/logo.png'

const CATEGORY_META = {
	temperature: { label: 'Temperature', unit: '°C', icon: '🌡️', higherLabel: 'Hotter', lowerLabel: 'Colder' },
	humidity: { label: 'Humidity', unit: '%', icon: '💧', higherLabel: 'More Humid', lowerLabel: 'Drier' },
};

const BEST_STREAK_KEY = 'weatherduel-best-streak';

// round 1, 3, 5... is temperature; round 2, 4, 6... is humidity
function categoryForRound(round) {
	return round % 2 === 1 ? 'temperature' : 'humidity';
}

function cityKey(city) {
	return `${city.name}|${city.country}`;
}

// grabs a random city that hasn't shown up yet this game (falls back to the full list if we somehow run out)
function pickOpponent(usedKeys) {
	const candidates = worldCities.filter((c) => !usedKeys.has(cityKey(c)));
	const pool = candidates.length > 0 ? candidates : worldCities;
	return pool[Math.floor(Math.random() * pool.length)];
}

// fetches temperature + humidity + local clock time for one or more cities in a single request
async function fetchWeatherFor(cities) {
	const lat = cities.map((c) => c.lat).join(',');
	const lon = cities.map((c) => c.lon).join(',');
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`;
	const res = await fetch(url);
	if (!res.ok) throw new Error('weather fetch failed');
	const data = await res.json();
	const list = Array.isArray(data) ? data : [data];
	return list.map((entry) => ({
		temperature: Math.round(entry.current.temperature_2m),
		humidity: Math.round(entry.current.relative_humidity_2m),
		// current.time comes back as "YYYY-MM-DDTHH:MM" already in that city's own local time
		time: entry.current.time.slice(11, 16),
	}));
}

function loadBestStreak() {
	try {
		return Number(localStorage.getItem(BEST_STREAK_KEY)) || 0;
	} catch {
		return 0;
	}
}

function saveBestStreak(value) {
	try {
		localStorage.setItem(BEST_STREAK_KEY, String(value));
	} catch {
		// storage blocked (private mode, etc), no big deal
	}
}

function WeatherDuel() {
	const [phase, setPhase] = useState('setup'); // setup -> loading -> playing -> revealed (revealed + !wasCorrect = game over)
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [error, setError] = useState(null);

	const [homeCity, setHomeCity] = useState(null);
	const [usedKeys, setUsedKeys] = useState(new Set());
	const [round, setRound] = useState(1);
	const [streak, setStreak] = useState(0);
	const [bestStreak, setBestStreak] = useState(loadBestStreak);

	const [baseCity, setBaseCity] = useState(null); // { name, country, weather: { temperature, humidity } }
	const [opponentCity, setOpponentCity] = useState(null);
	const [opponentWeather, setOpponentWeather] = useState(null);
	const [guess, setGuess] = useState(null);
	const [wasCorrect, setWasCorrect] = useState(false);

	const category = categoryForRound(round);
	const meta = CATEGORY_META[category];

	// searches Open-Meteo's city geocoder as the player types, debounced so it's not spamming requests
	useEffect(() => {
		if (query.trim().length < 2) {
			setSearchResults([]);
			return;
		}
		const handle = setTimeout(async () => {
			setSearchLoading(true);
			try {
				const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
				const data = await res.json();
				setSearchResults(data.results || []);
			} catch {
				setSearchResults([]);
			} finally {
				setSearchLoading(false);
			}
		}, 350);
		return () => clearTimeout(handle);
	}, [query]);

	// kicks off a fresh game with the picked home city as round 1's base
	async function startGame(city) {
		const home = { name: city.name, country: city.country, lat: city.latitude, lon: city.longitude };
		const opponent = pickOpponent(new Set([cityKey(home)]));

		setError(null);
		setPhase('loading');
		try {
			const [homeWeather, opponentWeather] = await fetchWeatherFor([home, opponent]);
			setHomeCity(home);
			setUsedKeys(new Set([cityKey(home), cityKey(opponent)]));
			setRound(1);
			setStreak(0);
			setBaseCity({ ...home, weather: homeWeather });
			setOpponentCity(opponent);
			setOpponentWeather(opponentWeather);
			setGuess(null);
			setPhase('playing');
		} catch {
			setError("Couldn't reach the weather API, try again.");
			setPhase('setup');
		}
	}

	// player locked in a guess, compare it against the hidden value and show the result
	function handleGuess(direction) {
		const baseValue = baseCity.weather[category];
		const opponentValue = opponentWeather[category];
		const actual = opponentValue === baseValue ? direction : opponentValue > baseValue ? 'higher' : 'lower';
		const correct = direction === actual;

		setGuess(direction);
		setWasCorrect(correct);
		setPhase('revealed');

		if (correct) {
			const newStreak = streak + 1;
			setStreak(newStreak);
			if (newStreak > bestStreak) {
				setBestStreak(newStreak);
				saveBestStreak(newStreak);
			}
		}
	}

	// moves the winning opponent into the base slot and lines up a new challenger
	async function nextRound() {
		const newBase = { ...opponentCity, weather: opponentWeather };
		const opponent = pickOpponent(usedKeys);

		setError(null);
		setPhase('loading');
		try {
			const [nextWeather] = await fetchWeatherFor([opponent]);
			setBaseCity(newBase);
			setOpponentCity(opponent);
			setOpponentWeather(nextWeather);
			setUsedKeys((prev) => new Set(prev).add(cityKey(opponent)));
			setRound((r) => r + 1);
			setGuess(null);
			setPhase('playing');
		} catch {
			setError("Couldn't reach the weather API, try again.");
			setPhase('revealed');
		}
	}

	// same home city, brand new chain
	function playAgain() {
		startGame({ name: homeCity.name, country: homeCity.country, latitude: homeCity.lat, longitude: homeCity.lon });
	}

	function changeCity() {
		setPhase('setup');
		setHomeCity(null);
		setQuery('');
		setSearchResults([]);
	}

	return (
		<div className="wd-page">
			<img src={weatherLogo} className="applogo" alt="Weather Duel logo" />

			{phase === 'setup' && (
				<div className="wd-card wd-setup">
					<p className="wd-lead">Pick your city, then guess if the world is hotter or more humid than home.</p>
					<input
						className="wd-search-input"
						type="text"
						placeholder="Search your city..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					{searchLoading && <p className="wd-hint">Searching...</p>}
					{error && <p className="wd-error">{error}</p>}
					{searchResults.length > 0 && (
						<ul className="wd-results">
							{searchResults.map((r) => (
								<li key={`${r.id}`}>
									<button type="button" onClick={() => startGame(r)}>
										{r.name}{r.admin1 ? `, ${r.admin1}` : ''} - {r.country}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}

			{phase === 'loading' && (
				<div className="wd-card wd-loading">
					<p>Checking the skies...</p>
				</div>
			)}

			{(phase === 'playing' || phase === 'revealed') && baseCity && opponentCity && (
				<div className="wd-game">
					<div className="wd-scoreline">
						<span>Streak: <strong>{streak}</strong></span>
						<span>Best: <strong>{bestStreak}</strong></span>
						<button type="button" className="wd-reset-button" onClick={playAgain}>Reset</button>
					</div>

					<div className="wd-duel">
						<div className="wd-city-card wd-base">
							<span className="wd-city-icon">{meta.icon}</span>
							<h2>{baseCity.name}</h2>
							<p className="wd-time">🕐 {baseCity.weather.time}</p>
							<p className="wd-value">{baseCity.weather[category]}{meta.unit}</p>
							<p className="wd-category-label">{meta.label}</p>
						</div>

						<div className="wd-vs">VS</div>

						<div className="wd-city-card wd-opponent">
							<span className="wd-city-icon">{meta.icon}</span>
							<h2>{opponentCity.name}</h2>
							<p className="wd-time">🕐 {opponentWeather.time}</p>
							<p className="wd-value">
								{phase === 'revealed' ? `${opponentWeather[category]}${meta.unit}` : '?'}
							</p>
							<p className="wd-category-label">{meta.label}</p>
						</div>
					</div>

					{phase === 'playing' && (
						<div className="wd-guess-row">
							<p className="wd-question">
								Will {opponentCity.name} be {meta.higherLabel.toLowerCase()} or {meta.lowerLabel.toLowerCase()} than {baseCity.name}?
							</p>
							<div className="wd-buttons">
								<button type="button" className="wd-guess-button" onClick={() => handleGuess('higher')}>
									{meta.higherLabel} ⬆️
								</button>
								<button type="button" className="wd-guess-button" onClick={() => handleGuess('lower')}>
									{meta.lowerLabel} ⬇️
								</button>
							</div>
						</div>
					)}

					{phase === 'revealed' && wasCorrect && (
						<div className="wd-result wd-result-correct">
							<p>Correct! You said {guess === 'higher' ? meta.higherLabel : meta.lowerLabel} 🎉</p>
							{error && <p className="wd-error">{error}</p>}
							<button type="button" className="counter" onClick={nextRound}>Next City →</button>
						</div>
					)}

					{phase === 'revealed' && !wasCorrect && (
						<div className="wd-result wd-result-wrong">
							<p>You said {guess === 'higher' ? meta.higherLabel : meta.lowerLabel}, that was wrong ❌</p>
						</div>
					)}
				</div>
			)}

			{phase === 'revealed' && !wasCorrect && (
				<div className="wd-card wd-gameover">
					<p className="wd-gameover-title">Game Over 💀</p>
					<p>Final streak: <strong>{streak}</strong></p>
					<p>Best streak: <strong>{bestStreak}</strong></p>
					<div className="wd-buttons">
						<button type="button" className="counter" onClick={playAgain}>Play Again</button>
						<button type="button" className="counter wd-secondary" onClick={changeCity}>Change City</button>
					</div>
				</div>
			)}

			<Link to="/">
				<button type="button" className="counter wd-home-link">
					Return to Home
				</button>
			</Link>
		</div>
	)
}

export default WeatherDuel
