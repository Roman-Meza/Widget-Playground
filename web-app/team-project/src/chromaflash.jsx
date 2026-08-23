import './chromaflash.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const SATURATION = 70;
const LIGHTNESS = 50;
const MEMORIZE_MS = 5000;
const GUESS_MS = 7000;
const CLOSE_STREAK_THRESHOLD = 15;
const WHEEL_STEP_DEG = 10;

const WHEEL_SIZE = 280;
const WHEEL_MARKER_RADIUS = (WHEEL_SIZE / 2) * 0.82;
const MEMORIZE_OUTER = 300;
const MEMORIZE_INNER = 220;

function hueColor(hue) {
	return `hsl(${hue}, ${SATURATION}%, ${LIGHTNESS}%)`;
}

function randomHue() {
	return Math.floor(Math.random() * 360);
}

// shortest angular distance between two hues, handles the 360 -> 0 wrap-around
function angularDiff(a, b) {
	const diff = Math.abs(a - b) % 360;
	return diff > 180 ? 360 - diff : diff;
}

// 100 points at 0-5 degrees off, fading down to 0 past 60 degrees off
function scoreForDiff(diff) {
	if (diff <= 5) return 100;
	if (diff >= 60) return 0;
	return Math.round(100 * (1 - (diff - 5) / 55));
}

// builds the full rainbow disc once, a conic-gradient stop every WHEEL_STEP_DEG
function buildWheelGradient() {
	const stops = [];
	for (let deg = 0; deg <= 360; deg += WHEEL_STEP_DEG) {
		stops.push(`${hueColor(deg % 360)} ${deg}deg`);
	}
	return `conic-gradient(${stops.join(', ')})`;
}

const WHEEL_GRADIENT = buildWheelGradient();

// draining pie: full circle of `color` at fraction 0, shrinks clockwise to nothing at fraction 1
function pieGradient(fraction, color) {
	const remainingDeg = (1 - fraction) * 360;
	return `conic-gradient(${color} ${remainingDeg}deg, rgba(255, 255, 255, 0.1) ${remainingDeg}deg)`;
}

// converts a hue (our 0deg-at-top, clockwise convention) into an x/y point on the wheel
function pointOnWheel(hue, radius) {
	const rad = (hue - 90) * (Math.PI / 180);
	return {
		x: WHEEL_SIZE / 2 + radius * Math.cos(rad),
		y: WHEEL_SIZE / 2 + radius * Math.sin(rad),
	};
}

function ChromaFlash() {
	const [phase, setPhase] = useState('memorize'); // memorize -> guess -> result
	const [roundId, setRoundId] = useState(0); // bumped every new round so timers restart even mid-phase
	const [targetHue, setTargetHue] = useState(randomHue);
	const [score, setScore] = useState(0);
	const [streak, setStreak] = useState(0);
	const [guessHue, setGuessHue] = useState(null); // null means the clock ran out
	const [roundDiff, setRoundDiff] = useState(null);
	const [roundPoints, setRoundPoints] = useState(0);

	const memorizePieRef = useRef(null);
	const guessPieRef = useRef(null);
	const wheelRef = useRef(null);
	const hoverSwatchRef = useRef(null);
	const rafIdRef = useRef(null);

	// picks a new color and jumps back to the memorize phase, keeping score/streak as-is
	function nextRound() {
		setTargetHue(randomHue());
		setGuessHue(null);
		setRoundDiff(null);
		setRoundPoints(0);
		setRoundId((id) => id + 1);
		setPhase('memorize');
	}

	// full reset: score and streak back to zero, then start a fresh round
	function resetGame() {
		setScore(0);
		setStreak(0);
		nextRound();
	}

	// shared by both "clicked" and "ran out of time" endings for a round
	function resolveRound(clickedHue) {
		let diff = null;
		let points = 0;
		if (clickedHue !== null) {
			diff = angularDiff(clickedHue, targetHue);
			points = scoreForDiff(diff);
		}
		setGuessHue(clickedHue);
		setRoundDiff(diff);
		setRoundPoints(points);
		setScore((s) => s + points);
		setStreak((s) => (diff !== null && diff < CLOSE_STREAK_THRESHOLD ? s + 1 : 0));
		setPhase('result');
	}

	// same "angle from a point on the wheel" math the click handler uses, shared with the hover preview
	function hueAtPoint(clientX, clientY) {
		const rect = wheelRef.current.getBoundingClientRect();
		const dx = clientX - (rect.left + rect.width / 2);
		const dy = clientY - (rect.top + rect.height / 2);
		const rawDeg = Math.atan2(dy, dx) * (180 / Math.PI);
		return ((rawDeg + 90) % 360 + 360) % 360;
	}

	function handleWheelClick(event) {
		if (phase !== 'guess') return;
		resolveRound(hueAtPoint(event.clientX, event.clientY));
	}

	// live preview so you can see the color you're currently pointing at, no click needed
	function handleWheelPointerMove(event) {
		if (phase !== 'guess' || !hoverSwatchRef.current) return;
		const point = event.touches ? event.touches[0] : event;
		hoverSwatchRef.current.style.background = hueColor(hueAtPoint(point.clientX, point.clientY));
	}

	function handleWheelPointerLeave() {
		if (hoverSwatchRef.current) {
			hoverSwatchRef.current.style.background = 'transparent';
		}
	}

	// phase 1: drains the ring around the swatch over MEMORIZE_MS, then moves on to guessing
	useEffect(() => {
		if (phase !== 'memorize') return;
		const start = performance.now();

		function tick(now) {
			const fraction = Math.min(1, (now - start) / MEMORIZE_MS);
			if (memorizePieRef.current) {
				memorizePieRef.current.style.background = pieGradient(fraction, '#00e5ff');
			}
			if (fraction >= 1) {
				setPhase('guess');
				return;
			}
			rafIdRef.current = requestAnimationFrame(tick);
		}

		rafIdRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafIdRef.current);
	}, [phase, roundId]);

	// phase 2: drains the center pie over GUESS_MS, a click resolves early, running out counts as a miss
	useEffect(() => {
		if (phase !== 'guess') return;
		const start = performance.now();

		function tick(now) {
			const fraction = Math.min(1, (now - start) / GUESS_MS);
			if (guessPieRef.current) {
				guessPieRef.current.style.background = pieGradient(fraction, '#ffe14d');
			}
			if (fraction >= 1) {
				resolveRound(null);
				return;
			}
			rafIdRef.current = requestAnimationFrame(tick);
		}

		rafIdRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafIdRef.current);
	}, [phase, roundId]);

	const guessPoint = guessHue !== null ? pointOnWheel(guessHue, WHEEL_MARKER_RADIUS) : null;
	const targetPoint = pointOnWheel(targetHue, WHEEL_MARKER_RADIUS);

	return (
		<div className="cf-page">
			<h1 className="cf-title">ChromaFlash</h1>

			<div className="cf-scoreline">
				<span>Score: <strong>{score}</strong></span>
				<span>Streak: <strong>{streak}</strong></span>
				<button type="button" className="cf-reset-button" onClick={resetGame}>Reset</button>
			</div>

			{phase === 'memorize' && (
				<div className="cf-stage">
					<p className="cf-instruction">Memorize this color!</p>
					<div className="cf-memorize-wrap" style={{ width: MEMORIZE_OUTER, height: MEMORIZE_OUTER }}>
						<div ref={memorizePieRef} className="cf-pie-ring" />
						<div
							className="cf-swatch"
							style={{ width: MEMORIZE_INNER, height: MEMORIZE_INNER, background: hueColor(targetHue) }}
						/>
					</div>
				</div>
			)}

			{phase === 'guess' && (
				<div className="cf-stage">
					<p className="cf-instruction">Click the wheel where that color was!</p>
					<div className="cf-wheel-wrap" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
						<div
							ref={wheelRef}
							className="cf-wheel"
							style={{ background: WHEEL_GRADIENT }}
							onClick={handleWheelClick}
							onMouseMove={handleWheelPointerMove}
							onMouseLeave={handleWheelPointerLeave}
							onTouchMove={handleWheelPointerMove}
						/>
						<div ref={guessPieRef} className="cf-center-pie" />
					</div>
					<div className="cf-hover-preview">
						<span>You're pointing at:</span>
						<div ref={hoverSwatchRef} className="cf-hover-swatch" />
					</div>
				</div>
			)}

			{phase === 'result' && (
				<div className="cf-stage">
					<div className="cf-wheel-wrap" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
						<div className="cf-wheel cf-wheel-dim" style={{ background: WHEEL_GRADIENT }} />
						<div
							className="cf-marker cf-marker-target"
							style={{ left: targetPoint.x, top: targetPoint.y }}
						/>
						{guessPoint && (
							<div
								className="cf-marker cf-marker-guess"
								style={{ left: guessPoint.x, top: guessPoint.y, background: hueColor(targetHue) }}
							/>
						)}
					</div>

					<p className="cf-legend">● = actual color, shown where you clicked &nbsp; ○ = where it really was</p>

					<div className="cf-result-info">
						{guessHue !== null ? (
							<p>You were <strong>{Math.round(roundDiff)}°</strong> off - <strong>+{roundPoints}</strong> points</p>
						) : (
							<p>Time's up, you didn't click in time - <strong>+0</strong> points</p>
						)}
						<button type="button" className="counter" onClick={nextRound}>Next Round →</button>
					</div>
				</div>
			)}

			<Link to="/">
				<button type="button" className="counter cf-home-link">
					Return to Home
				</button>
			</Link>
		</div>
	)
}

export default ChromaFlash
