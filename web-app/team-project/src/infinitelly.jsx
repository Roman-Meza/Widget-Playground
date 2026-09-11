import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './infinitelly.css';
import tvFrame from './assets/infinitelly/tvframe.png';
import {RandomImage, changetheme, toggleTV} from './assets/infinitelly/randomimage';
import infinitellyLogo from './assets/infinitelly/logo.png';
import onBtn from './assets/infinitelly/on-btn.png';
import catBtn from './assets/infinitelly/cat-btn.png';
import dogBtn from './assets/infinitelly/dog-btn.png';
import randomBtn from './assets/infinitelly/random-btn.png';
import treeBtn from './assets/infinitelly/tree-btn.png';
import carBtn from './assets/infinitelly/car-btn.png';
import fishBtn from './assets/infinitelly/fish-btn.png';
import basketballBtn from './assets/infinitelly/basketball-btn.png';
import footballBtn from './assets/infinitelly/football-btn.png';
import spaceBtn from './assets/infinitelly/space-btn.png';
import instructions from './assets/infinitelly/instructions.png';
// import defBtn from './assets/infinitelly/default-btn.png';

function Infinitelly() {
    const tvRef = useRef(null);
    useEffect(() => {
            initializeTV(tvRef);
    }, []);
    
    return(
        <div ref={tvRef} className="infinitellybody">
            <div className='tv-header'>
            <img src={infinitellyLogo} className="tvlogo" alt="InfiniTube logo" /></div>
            <div className='tv-set'>
                <div className='television'>
                    <div className='screen-bg'><RandomImage/></div>
                    <div className='tv-frame'><img className='tv-frame-img' src={tvFrame}></img></div>
                </div>
                <div>
                    <img src={instructions} className='instructions' />
                <table className='tv-remote'>
                    
                    <tbody>
                    <tr><td><button onClick={() => toggleTV()}><img className='tv-btn' src={onBtn} /></button></td></tr>

                    <tr><td><button onClick={() => changetheme('cats')}><img className='tv-btn' src={catBtn} /></button></td>
                    <td><button onClick={() => changetheme('dog')}><img className='tv-btn' src={dogBtn} /></button></td>
                    <td><button onClick={() => changetheme('nature')}><img className='tv-btn' src={treeBtn} /></button></td></tr>

                    <tr><td><button onClick={() => changetheme('car')}><img className='tv-btn' src={carBtn} /></button></td>
                    <td><button onClick={() => changetheme('basketball')}><img className='tv-btn' src={basketballBtn} /></button></td>
                    <td><button onClick={() => changetheme('football')}><img className='tv-btn' src={footballBtn} /></button></td></tr>

                    <tr><td><button onClick={() => changetheme('sealife')}><img className='tv-btn' src={fishBtn} /></button></td>
                    <td><button onClick={() => changetheme('space')}><img className='tv-btn' src={spaceBtn} /></button></td>
                    <td><button onClick={() => changetheme('random')}><img className='tv-btn' src={randomBtn} /></button></td></tr>
                    </tbody>
                </table>
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


const initializeTV = async (tvRef) =>{
    const getElementById = (id) => tvRef.current?.querySelector(`#${id}`);
    let imgtheme='dogs'
    
    let target_screen=getElementById('screen');
    console.log(target_screen);

    // function RandomImage() {
    //     target_screen.src='https://loremflickr.com/800/500/'+imgtheme
    // }
    // RandomImage();
}

export default Infinitelly;