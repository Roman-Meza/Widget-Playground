import './paint.css';
import { Link } from 'react-router-dom';
import cursorsq from './assets/paint/cursorsq.png';
import cursorci from './assets/paint/cursorci.png';
import cursorci1 from './assets/paint/cursorci1.png';
import cursorq1 from './assets/paint/cursorsq1.png';
import cursor from './assets/paint/cursor.png';
import cursor1 from './assets/paint/cursor1.png';
import cursor2 from './assets/paint/cursor2.png';
import drawsquare from './assets/paint/drawsquare.png';
import fillsquare from './assets/paint/fillsquare.png';
import drawline from './assets/paint/drawline.png';
import drawcircle from './assets/paint/drawcircle.png';
import fillcircle from './assets/paint/fillcircle.png';
import drawcurve from './assets/paint/drawcurve.png';
import drawbezier from './assets/paint/drawbezier.png';
import rainbow from './assets/paint/rainbow.png';
import rainbow1 from './assets/paint/rainbow1.png';
import dropper from './assets/paint/dropper.png';
import logo from './assets/paint/logo.png';
import mario from './assets/paint/mario.png';
import music from './assets/paint/Creative Exercise.mp3';
import { useRef, useEffect } from 'react';

function Paint() {
	const paintRef = useRef(null);

	useEffect(() => {
		initializePaint(paintRef);
	}, []);

	return (
		<div className="paintbody">
		<table ref={paintRef} className="outer">
			<tbody>
				<tr>
					<td>
						<table className="paint">
							<tbody>
								<tr>
									<td rowSpan={6}>
										
											<img className="paintlogo" src={logo} alt="Logo" />
											<div style={{ position: 'relative' }}>
											<canvas id="overlay" width="600" height="500" style={{ cursor: `url(${cursor}), auto` }} />
											<canvas id="myCanvas" width="600" height="500" />
										</div>
										<div>
											<button className="paint" id="drawSquare"><img src={drawsquare} alt="Draw square" /></button>
											<button className="paint" id="fillSquare"><img src={fillsquare} alt="Fill square" /></button>
											<button className="paint" id="drawLine"><img src={drawline} alt="Draw line" /></button>
											<button className="paint" id="drawCircle"><img src={drawcircle} alt="Draw circle" /></button>
											<button className="paint" id="fillCircle"><img src={fillcircle} alt="Fill circle" /></button>
											<button className="paint" id="drawCurve"><img src={drawcurve} alt="Draw curve" /></button>
											<button className="paint" id="drawBezier"><img src={drawbezier} alt="Draw bezier" /></button>
											<button className="paint" id="rainbowH"><img src={rainbow} alt="Horizontal rainbow" /></button>
									<button className="paint" id="rainbowV"><img src={rainbow1} alt="Vertical rainbow" /></button>
									<button className="paint" id="dropper"><img src={dropper} alt="Color picker" /></button><br />
											<button className="paint" id="clearCanvas">Clear canvas</button><button className="paint" id="saveCanvas">Save</button><button className="paint" id="playMusic">Toggle music</button><br />
										</div>
									</td>
									<td>
										<div className="controls">
											
											<input type="range" id="lineWidth" min="1" max="10" defaultValue="3" /><br /> Brush size
										</div>
									</td>
								</tr>
								{[
									['redRange', 'Red'],
									['greenRange', 'Green'],
									['blueRange', 'Blue'],
								].map(([id, label]) => (
									<tr key={id}><td><div className="colorslider"><input type="range" min="0" max="255" defaultValue="0" className="slider" id={id} /><br />{label}</div></td></tr>
								))}
								<tr><td><div className="colorslider"><input type="range" min="0" max="100" defaultValue="0" className="slider" id="alphaRange" /><br /> Opacity</div></td></tr>
								<tr><td>
									<div className="previewbg"><div id="colorpreview" /></div>

									<br /><button className="paint" id="fillbg">Fill background</button>
								</td></tr>
							</tbody>
						</table>
					</td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<Link to="/">
          <button type="button" className="counter">
            Return to Home
          </button>
        </Link>
		</div>
	)
}

function initializePaint(paintRef) {
	const getElementById = (id) => paintRef.current?.querySelector(`#${id}`);
	const setCursor = (cursorUrl) => {
		getElementById('overlay').style.cursor = `url(${cursorUrl}), auto`;
	};
	const setBrushCursor = (lineWidth) => {
		setCursor(lineWidth <= 3 ? cursor : lineWidth < 8 ? cursor1 : cursor2);
	};
var musica = new Audio({src: music});
		musica.loop=true;
		var tocaMusica=false;
		const canvas = getElementById('myCanvas'); // Obtener el canvas
		const overlay = getElementById('overlay');
        const ctx = canvas.getContext('2d'); // Obtener el contexto del canvas
		const octx = overlay.getContext('2d');

        let drawing = false; // Bandera para saber si el usuario está dibujando
        let lastX = 0, lastY = 0; // Para rastrear la última posición del ratón
		let lastX2 = 0, lastY2 = 0;
		
		let drawingSquare=false;
		let drawingCircle=false;
		let fillingSquare=false;
		let fillingCircle=false;
		let drawingLine=false;
		let drawingCurve=false;
		let curveClick=false;
		let drawingBezier=false;
		
		var controlX=0;
		var controlY=0;
		var controlX2=0;
		var controlY2=0;
		var bezierCount=0;
		var middleX=0;
		var middleY=0;
		
		let dropperActive=false;
		let rainbowBrush=false;
		let rainbowBrush1=false;
		const grad1=ctx.createLinearGradient(0,0,600,0);
		grad1.addColorStop(0, "red");
		grad1.addColorStop(.2, "orange");
		grad1.addColorStop(.4, "yellow");
		grad1.addColorStop(.6, "green");
		grad1.addColorStop(.8, "blue");
		grad1.addColorStop(1, "purple");
		const grad2=ctx.createLinearGradient(0,0,0,500);
		grad2.addColorStop(0, "red");
		grad2.addColorStop(.2, "orange");
		grad2.addColorStop(.4, "yellow");
		grad2.addColorStop(.6, "green");
		grad2.addColorStop(.8, "blue");
		grad2.addColorStop(1, "purple");
		
		var redSlider = getElementById("redRange");
		var greenSlider = getElementById("greenRange");
		var blueSlider = getElementById("blueRange");
		var alphaSlider = getElementById("alphaRange");
		var colorPreview = getElementById("colorpreview");
		var fillBackground = getElementById("fillbg");
		
		redSlider.addEventListener('mousemove', () =>{
			colorPreview.style.backgroundColor="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
		});
		greenSlider.addEventListener('mousemove', () =>{
			colorPreview.style.backgroundColor="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
		});
		blueSlider.addEventListener('mousemove', () =>{
			colorPreview.style.backgroundColor="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
		});
		alphaSlider.addEventListener('mousemove', () =>{
			colorPreview.style.backgroundColor="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
		});
		fillBackground.addEventListener('click', () =>{
			canvas.style.backgroundColor="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
		});
	

        // Cambiar el grosor del trazo
		getElementById('lineWidth').addEventListener('input', (e) => {
            ctx.lineWidth = e.target.value;
			setBrushCursor(ctx.lineWidth);
        });

        // Evento para borrar todo el lienzo
		getElementById('clearCanvas').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        });

	    // Guardar dibujo como .png
		var link = getElementById('saveCanvas');
	link.setAttribute('download', 'drawing.png');
	link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
	link.click();

		getElementById('playMusic').addEventListener('click', () => {
            if(tocaMusica){
				musica.pause();
				tocaMusica=false;
			}else{
				musica.play();
				tocaMusica=true;
			}
        });
		
		getElementById('drawSquare').addEventListener('click', () => {
			if(drawingSquare){
				drawingSquare=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				drawingSquare=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			drawingCurve=false;
			dropperActive=false;
			drawingBezier=false;
			setCursor(cursorsq);
		});
		
		getElementById('drawCircle').addEventListener('click', () => {
			if(drawingCircle){
				drawingCircle=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				drawingCircle=true;
			}
			drawingSquare=false;
			fillingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			drawingCurve=false;
			dropperActive=false;
			drawingBezier=false;
			setCursor(cursorci);
		});
		
		getElementById('fillSquare').addEventListener('click', () => {
			if(fillingSquare){
				fillingSquare=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				fillingSquare=true;
			}
			drawingCircle=false;
			drawingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			drawingCurve=false;
			dropperActive=false;
			drawingBezier=false;
			setCursor(cursorq1);
		});
		
		getElementById('fillCircle').addEventListener('click', () => {
			if(fillingCircle){
				fillingCircle=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				fillingCircle=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			drawingSquare=false;
			drawingLine=false;
			drawingCurve=false;
			dropperActive=false;
			drawingBezier=false;
			setCursor(cursorci1);
		});
		
		getElementById('drawLine').addEventListener('click', () => {
			if(drawingLine){
				drawingLine=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				drawingLine=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			drawingSquare=false;
			fillingCircle=false;
			drawingCurve=false;
			dropperActive=false;
			drawingBezier=false;
			setBrushCursor(ctx.lineWidth);
		});
		
		getElementById('drawCurve').addEventListener('click', () => {
			if(drawingCurve){
				drawingCurve=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				drawingCurve=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			drawingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			dropperActive=false;
			drawingBezier=false;
			setBrushCursor(ctx.lineWidth);
		});
		
		getElementById('drawBezier').addEventListener('click', () => {
			if(drawingBezier){
				drawingBezier=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				drawingBezier=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			drawingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			dropperActive=false;
			drawingCurve=false;
			setBrushCursor(ctx.lineWidth);
		});
		
		getElementById('rainbowV').addEventListener('click', () => {
			if(rainbowBrush){
				rainbowBrush=false;
				ctx.strokeStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
				ctx.fillStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
				return;
			}else{
				ctx.strokeStyle=grad1;
				ctx.fillStyle=grad1;
				rainbowBrush=true;
				rainbowBrush1=false;
			}
		});
		
		getElementById('rainbowH').addEventListener('click', () => {
			if(rainbowBrush1){
				rainbowBrush1=false;
				ctx.strokeStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
				ctx.fillStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
				return;
			}else{
				ctx.strokeStyle=grad2;
				ctx.fillStyle=grad2;
				rainbowBrush1=true;
				rainbowBrush=false;
			}
		});
		
		getElementById('dropper').addEventListener('click', () => {
			if(dropperActive){
				dropperActive=false;
				setBrushCursor(ctx.lineWidth);
				return;
			}else{
				dropperActive=true;
			}
			drawingCircle=false;
			fillingSquare=false;
			drawingSquare=false;
			fillingCircle=false;
			drawingLine=false;
			drawingCurve=false;
			setBrushCursor(ctx.lineWidth);
		});

        // Evento al presionar el ratón
        overlay.addEventListener('mousedown', (e) => {
			if(dropperActive){
				var data = ctx.getImageData(e.offsetX, e.offsetY, 600, 500).data;
				ctx.strokeStyle="rgba("+data[0]+","+data[1]+","+data[2]+","+data[3]+")";
				ctx.fillStyle="rgba("+data[0]+","+data[1]+","+data[2]+","+data[3]+")";
				colorPreview.style.backgroundColor="rgba("+data[0]+","+data[1]+","+data[2]+",1)";
				redSlider.value=data[0];
				greenSlider.value=data[1];
				blueSlider.value=data[2];
				alphaSlider.value=0;
				dropperActive=false;
			}
			if(curveClick){
				ctx.beginPath();
					ctx.moveTo(lastX,lastY);
					ctx.quadraticCurveTo(controlX, controlY, lastX2, lastY2);
					ctx.stroke();
				ctx.closePath();
				curveClick=false;
				drawingCurve=true;
				return;
			}
			if(bezierCount==1){
				bezierCount=2;
				return;
			}else if(bezierCount==2){
				ctx.beginPath();
					ctx.moveTo(lastX,lastY);
					ctx.bezierCurveTo(controlX, controlY, controlX2, controlY2, lastX2, lastY2);
					ctx.stroke();
				ctx.closePath();
				bezierCount=0;
				drawingBezier=true;
				return;
			}
            drawing = true; // Activar la bandera de dibujo
            [lastX, lastY] = [e.offsetX, e.offsetY]; // Guardar la posición inicial
			if(!(rainbowBrush||rainbowBrush1)){
			ctx.strokeStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
			ctx.fillStyle="rgba("+redSlider.value+","+greenSlider.value+","+blueSlider.value+","+(1-alphaSlider.value/100)+")";
			}
        });

        // Evento al soltar el ratón
        overlay.addEventListener('mouseup', () => {
			if(drawingSquare||drawingCircle||drawingLine) ctx.stroke();
			if(fillingSquare||fillingCircle) ctx.fill();
			if(curveClick) drawingCurve=false;
			if(bezierCount>0) drawingBezier=false;
            drawing = false; // Desactivar la bandera de dibujo
        });

        // Evento al mover el ratón
        overlay.addEventListener('mousemove', (e) => {
            if (!drawing){
				if(curveClick){
					middleX=lastX-(lastX-lastX2)/2;
					middleY=lastY-(lastY-lastY2)/2;
					controlX = e.offsetX+(e.offsetX-middleX);
					controlY = e.offsetY+(e.offsetY-middleY);
					
					octx.beginPath();
					octx.moveTo(lastX,lastY);
					octx.quadraticCurveTo(controlX, controlY, lastX2, lastY2);
					sleep(50).then(() => {octx.clearRect(0,0,600,500);});
					octx.stroke();
					octx.stroke();
					octx.closePath();
				}else if(bezierCount==1){
					middleX=lastX-(lastX-lastX2)/2;
					middleY=lastY-(lastY-lastY2)/2;
					controlX = e.offsetX+(e.offsetX-middleX);
					controlY = e.offsetY+(e.offsetY-middleY);
					
					octx.beginPath();
					octx.moveTo(lastX,lastY);
					octx.bezierCurveTo(controlX, controlY, lastX, lastY, lastX2, lastY2);
					sleep(50).then(() => {octx.clearRect(0,0,600,500);});
					octx.stroke();
					octx.stroke();
					octx.closePath();
				}else if(bezierCount==2){
					middleX=lastX-(lastX-lastX2)/2;
					middleY=lastY-(lastY-lastY2)/2;
					controlX2 = e.offsetX+(e.offsetX-middleX);
					controlY2 = e.offsetY+(e.offsetY-middleY);
					
					octx.beginPath();
					octx.moveTo(lastX,lastY);
					octx.bezierCurveTo(controlX, controlY, controlX2, controlY2, lastX2, lastY2);
					sleep(50).then(() => {octx.clearRect(0,0,600,500);});
					octx.stroke();
					octx.stroke();
					octx.closePath();
				}else{
					return;
				}
			} // Si no estamos dibujando, salimos de la función
			if (drawingSquare||fillingSquare){
				ctx.lineCap = 'square';
				ctx.beginPath(); // Comenzar un nuevo camino
				ctx.moveTo(lastX, lastY); // Moverse a la última posición
				ctx.lineTo(e.offsetX, lastY);
				ctx.lineTo(e.offsetX, e.offsetY); 
				ctx.lineTo(lastX, e.offsetY); 
				ctx.lineTo(lastX, lastY);
				
				octx.beginPath();
				octx.moveTo(lastX, lastY);
				octx.lineTo(e.offsetX, lastY);
				octx.lineTo(e.offsetX, e.offsetY); 
				octx.lineTo(lastX, e.offsetY); 
				octx.lineTo(lastX, lastY);
				sleep(50).then(() => {octx.clearRect(0,0,600,500);});
				octx.stroke();
				octx.stroke();
			}else if(drawingCircle||fillingCircle){
				ctx.beginPath();
				ctx.ellipse(lastX, lastY, Math.abs(e.offsetX-lastX), Math.abs(e.offsetY-lastY), 0, 0, 2 * Math.PI);
				ctx.closePath();
				octx.beginPath();
				octx.ellipse(lastX, lastY, Math.abs(e.offsetX-lastX), Math.abs(e.offsetY-lastY), 0, 0, 2 * Math.PI);
				sleep(50).then(() => {octx.clearRect(0,0,600,500);});
				octx.stroke();
				octx.stroke();
				octx.closePath();
			}else if(drawingLine){
				ctx.lineCap = 'round';
				ctx.beginPath();
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.closePath();
				
				octx.beginPath();
				octx.moveTo(lastX, lastY);
				octx.lineTo(e.offsetX, e.offsetY);
				octx.closePath();
				sleep(50).then(() => {octx.clearRect(0,0,600,500);});
				octx.stroke();
				octx.stroke();
			}else if(drawingCurve){
				octx.beginPath();
				octx.moveTo(lastX, lastY);
				octx.lineTo(e.offsetX, e.offsetY);
				octx.closePath();
				sleep(50).then(() => {octx.clearRect(0,0,600,500);});
				octx.stroke();
				octx.stroke();
				[lastX2, lastY2] = [e.offsetX, e.offsetY];
				curveClick=true;
			}else if(drawingBezier){
				octx.beginPath();
				octx.moveTo(lastX, lastY);
				octx.lineTo(e.offsetX, e.offsetY);
				octx.closePath();
				sleep(50).then(() => {octx.clearRect(0,0,600,500);});
				octx.stroke();
				octx.stroke();
				[lastX2, lastY2] = [e.offsetX, e.offsetY];
				bezierCount=1;
			}else if(!(curveClick)&&bezierCount==0){
				ctx.lineCap = 'round';
				ctx.beginPath(); // Comenzar un nuevo camino
				ctx.moveTo(lastX, lastY); // Moverse a la última posición
				ctx.lineTo(e.offsetX, e.offsetY); // Dibujar hasta la nueva posición
				ctx.stroke(); // Realizar el trazo
				[lastX, lastY] = [e.offsetX, e.offsetY]; // Actualizar la última posición
			}
        });
		
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

        // Establecer propiedades del trazo
        ctx.lineWidth = 3; // Ancho del trazo
        ctx.lineCap = 'round'; // Terminar los trazos con un borde redondeado
    }
export default Paint