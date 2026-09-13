import './outbreak.css';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import outbreakLogo from './assets/outbreak/logo.png'
import pill1 from './assets/outbreak/pill1.png'
import pill2 from './assets/outbreak/pill2.png'
import pill3 from './assets/outbreak/pill3.png'
import pill4 from './assets/outbreak/pill4.png'
import virus_img from './assets/outbreak/virus.png'

function Outbreak() {
	const pageRef = useRef(null);

	useEffect(() => {
		return initializeOutbreak(pageRef);
	}, []);

	return (
		<div className="outbreak-page" ref={pageRef}>
			<div className="outbreak-row">
				<div className="outbreak-score-panel">
					<img src={outbreakLogo} className="applogo" alt="OutBreak logo" />
					<div className="outbreak-canvas-wrap">
						<canvas id="outbreakCanvas" width="650" height="500" />
					</div>
				</div>
				<div className="outbreak-scoreboard">
					<h2>Score</h2>
					<p id="outbreakScore" className="outbreak-score-value">0</p>
					<h2>Blocks</h2>
					<p id="outbreakBlocks" className="outbreak-score-value">48</p>
				</div>
			</div>

			<div className="outbreak-row">
				<div className="outbreak-instructions">
					<h2 id="outbreakWin">You move with your mouse!</h2>
					<div className="outbreak-buttons">
						<button type="button" className="counter" id="outbreakRestart">Restart</button>
						<button type="button" className="counter" id="outbreakMusic">Music: Off</button>
						<button type="button" className="counter outbreak-cheat" id="outbreakGanar" title="Modo trampa">Win (cheats)</button>
					</div>
				</div>
			</div>

			<Link to="/">
				<button type="button" className="counter">
					Return to Home
				</button>
			</Link>
		</div>
	)
}

function initializeOutbreak(pageRef) {
	const getElementById = (id) => pageRef.current?.querySelector(`#${id}`);

	//NOTE: Some variable names below are in Spanish because this app was originally a project for a class in Spanish.

	const canvas = getElementById('outbreakCanvas');
	const ctx = canvas.getContext('2d');
	const winHeading = getElementById('outbreakWin');
	const ganarButton = getElementById('outbreakGanar');
	const restartButton = getElementById('outbreakRestart');
	const musicButton = getElementById('outbreakMusic');
	const scoreDisplay = getElementById('outbreakScore');
	const blocksDisplay = getElementById('outbreakBlocks');
	const pillgreen = new Image();
	pillgreen.src=pill1;
	const pillyellow = new Image();
	pillyellow.src=pill2;
	const pillred= new Image();
	pillred.src=pill3;
	const pillblue = new Image();
	pillblue.src=pill4;
	const virus = new Image();
	virus.src=virus_img;

	// drop the track at public/outbreak-music.mp3 and this just starts working, no code changes needed
	const music = new Audio('/outbreak-music.mp3');
	music.loop = true;
	let musicPlaying = false;

	const Pelota = 5;

	const BarraAltura = 10;
	const BarraAncho = 69 * 1.5;
	const BarraY = canvas.height - BarraAltura - 5;

	// builds a horizontal gradient to paint a whole row of blocks
	function makeRowGradient(colors) {
		const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
		colors.forEach((c, idx) => g.addColorStop(idx / (colors.length - 1), c));
		return g;
	}

	// 4 rows, 4 gradients, just to match the neon vibe
	const rowGradients = [
		makeRowGradient(['#ff2fd0', '#ff8a3d']),
		makeRowGradient(['#00e5ff', '#3d7bff']),
		makeRowGradient(['#4dff88', '#00e5ff']),
		makeRowGradient(['#ffe14d', '#ff8a3d']),
	];

	let matrizcuadros;
	let x, y;
	let direccionX, direccionY;
	let BarraX;
	let k;
	let score;
	let gameOver;
	let rafRefrescar = null;
	let rafCuadros = null;

	// starts everything from scratch: blocks, ball, paddle, score
	function iniciar() {
		matrizcuadros = [];
		let val = 4;
		for (let i = 0; i < 4; i++) {
			matrizcuadros[i] = [];
			for (let j = 0; j < 12; j++) {
				matrizcuadros[i][j] = val;
			}
			val--;
		}

		x = canvas.width / 2;
		y = canvas.height - 30;
		direccionX = 4;
		direccionY = -4;
		BarraX = (canvas.width - BarraAncho) / 2;
		k = 0;
		score = 0;
		gameOver = false;

		winHeading.textContent = 'You move with your mouse!';
		winHeading.classList.remove('outbreak-win', 'outbreak-lose');
		scoreDisplay.textContent = '0';
		blocksDisplay.textContent = '48';
	}

	// draws a rectangle with rounded corners, paddle and blocks both use this
	function drawRoundedRect(rx, ry, rw, rh, radius) {
		ctx.beginPath();
		if (ctx.roundRect) {
			ctx.roundRect(rx, ry, rw, rh, radius);
		} else {
			ctx.rect(rx, ry, rw, rh);
		}
		ctx.fill();
	}

	// draws the paddle with its little cyan glow
	function DibujarBarra() {
		ctx.save();
		ctx.shadowColor = '#00e5ff';
		ctx.shadowBlur = 12;
		ctx.fillStyle = '#7df9ff';
		drawRoundedRect(BarraX, BarraY, BarraAncho, BarraAltura, 5);
		ctx.restore();
	}

	// follows the mouse, just keeps the paddle from sliding off the canvas
	function handleMouseMove(event) {
		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		BarraX = mouseX - BarraAncho / 2;

		if (BarraX < 0) {
			BarraX = 0;
		} else if (BarraX > canvas.width - BarraAncho) {
			BarraX = canvas.width - BarraAncho;
		}
	}

	// win screen, stops the loop
	function win() {
		gameOver = true;
		winHeading.textContent = 'You won :D!';
		winHeading.classList.add('outbreak-win');
	}

	// lose screen, stops the loop
	function perder() {
		gameOver = true;
		winHeading.textContent = 'You lost :(';
		winHeading.classList.add('outbreak-lose');
	}

	// checks if the ball hit the paddle
	// only bounces if it's heading down, if not it stick and jitter there
	function ColisionBarra() {
		if (direccionY > 0 && y + Pelota >= BarraY && x >= BarraX - Pelota && x <= BarraX + BarraAncho + Pelota) {
			direccionY = -direccionY;
		} else if (y - Pelota > canvas.height) {
			perder();
		}
	}

	// draws the ball with its little white glow
	function DibujarPelota() {
		// ctx.save();
		// ctx.shadowColor = '#ffffff';
		// ctx.shadowBlur = 10;
		// ctx.beginPath();
		// ctx.arc(x, y, Pelota, 0, Math.PI * 2);
		// ctx.fillStyle = '#ffffff';
		// ctx.fill();
		// ctx.closePath();
		// ctx.restore();
		ctx.drawImage(virus,x-Pelota,y-Pelota);
	}

	// draws whatever blocks are still alive, row by row
	function cuadros() {
		let w = 40, h = 20, xx = 30, yy = 20;
		let pillcolors=[pillgreen,pillyellow,pillred,pillblue];
		let pill_img = new Image();

		for (let f = 0; f < 4; f++) {
			ctx.fillStyle = rowGradients[f];
			pill_img=pillcolors[f]
			for (let col = 0; col < 12; col++) {
				if (matrizcuadros[f][col] != 0) {
					ctx.drawImage(pill_img,xx,yy);
				}
				xx += 50;
			}
			yy += 60;
			xx = 30;
		}
	}

	// nudges the ball one step in whatever direction it's going
	function MovimientoPelota() {
		x = x + direccionX;
		y = y + direccionY;
	}

	// wipes the canvas so the next frame can be drawn clean
	function LimpiarCanva() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	// bounces off the top/left/right walls (the bottom is the paddle's job)
	function Paredes() {
		if (direccionX > 0 && x + direccionX > canvas.width - Pelota) {
			direccionX = -direccionX;
		} else if (direccionX < 0 && x + direccionX < Pelota) {
			direccionX = -direccionX;
		}
		if (direccionY < 0 && y + direccionY < Pelota) {
			direccionY = -direccionY;
		}
	}

	// checks if the ball is overlapping a block, no exact-pixel matching so it
	// can't skip a block just for not landing on the right pixel
	function rebotecuadros() {
		let xx = 30, yy = 20, w = 40, h = 20;

		// only one hit per frame, otherwise clipping two blocks at once could cancel the bounce out
		fuera:
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 12; j++) {
				if (matrizcuadros[i][j] != 0) {
					const nx = x + direccionX;
					const ny = y + direccionY;
					const seEncima = nx + Pelota > xx && nx - Pelota < xx + w && ny + Pelota > yy && ny - Pelota < yy + h;

					if (seEncima) {
						const metidoX = Math.min(nx + Pelota - xx, xx + w - (nx - Pelota));
						const metidoY = Math.min(ny + Pelota - yy, yy + h - (ny - Pelota));
						if (metidoX < metidoY) {
							direccionX = -direccionX;
						} else {
							direccionY = -direccionY;
						}
						k++;
						score += 10;
						matrizcuadros[i][j] = 0;
						break fuera;
					}
				}

				xx += 50;
			}
			yy += 60;
			xx = 30;
		}

		scoreDisplay.textContent = String(score);
		blocksDisplay.textContent = String(48 - k);

		if (k >= 48) {
			win();
		}
	}

	// the cheat button, wins instantly with zero effort
	function ganar() {
		win();
	}

	// flips the background track on/off, ignores errors if the file just isn't there yet
	function toggleMusic() {
		if (musicPlaying) {
			music.pause();
		} else {
			music.play().catch(() => {});
		}
		musicPlaying = !musicPlaying;
		musicButton.textContent = musicPlaying ? 'Music: On' : 'Music: Off';
	}

	// stops the old loop (if it's still running) and starts fresh
	function reiniciar() {
		if (rafRefrescar) cancelAnimationFrame(rafRefrescar);
		if (rafCuadros) cancelAnimationFrame(rafCuadros);
		iniciar();
		refrescar();
	}

	// the game loop, calls itself every frame until you win, lose, or bail
	function refrescar() {
		if (gameOver) return;
		LimpiarCanva();
		DibujarPelota();
		MovimientoPelota();
		Paredes();
		rebotecuadros();
		DibujarBarra();
		ColisionBarra();
		rafRefrescar = window.requestAnimationFrame(refrescar);
		rafCuadros = window.requestAnimationFrame(cuadros);
	}

	iniciar();
	canvas.addEventListener('mousemove', handleMouseMove);
	ganarButton.addEventListener('click', ganar);
	restartButton.addEventListener('click', reiniciar);
	musicButton.addEventListener('click', toggleMusic);
	refrescar();

	return () => {
		gameOver = true;
		if (rafRefrescar) cancelAnimationFrame(rafRefrescar);
		if (rafCuadros) cancelAnimationFrame(rafCuadros);
		music.pause();
		canvas.removeEventListener('mousemove', handleMouseMove);
		ganarButton.removeEventListener('click', ganar);
		restartButton.removeEventListener('click', reiniciar);
		musicButton.removeEventListener('click', toggleMusic);
	};
}

export default Outbreak
