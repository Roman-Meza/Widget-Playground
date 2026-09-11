import { useEffect, useState } from "react";
import screenStatic from './static.gif';
import tvOff from './tv-off.png';

let imgtheme='off';
const randomthemes=['sunset','christmas','park','river','clown','dinner','city','street','sky','beach'];

export function changetheme(theme){
  if(imgtheme!='off'){
    if(imgtheme=='random'){
      imgtheme=randomthemes[Math.floor(Math.random() * 10)];
    }else{
      imgtheme=theme;
      console.log(theme);
    }
  }
}

export function toggleTV(){
  if (imgtheme!='off'){
    imgtheme='off';
  }else{
    imgtheme='static';
  }
}

export function RandomImage() {
  const [random, setRandom] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandom((previous) => previous + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  if(imgtheme=='static'){
    return (
        <img className='static-screen' id='screen' src={screenStatic}/>
    )
  }else if(imgtheme=='off'){
    return (
        <img className='static-screen' id='screen' src={tvOff}/>
    )
  }
  return (
    <img className='static-screen' id='screen' src={"https://loremflickr.com/500/300/"+imgtheme+"?random="+random}/>
  );
}

