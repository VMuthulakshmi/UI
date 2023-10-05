import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TV from '../../components/tv';
import channels from "../../data.json";
import "./Home.scss";


export default function Home() {

    const [on,setOn] = useState(false);
    const [vol,setVol] = useState(10);
    const [activeChannel,setActiveChannel] = useState(1);
    const maxVol = 20
    const maxChannel = channels.length;


    return (
        
        <div className={`home tv-${on ? 'on' : ''}`}>
            <TV on={on} activeChannel={activeChannel} volume={vol}/>
            <div className='btn-on-off'>
                <div className= {`btn-block ${on ? 'active' : ''}`} onClick={()=>{setOn(!on)}}>
                    <div className="each-btn on">ON</div>
                    <div className="each-btn off">OFF</div>
                </div>
            </div>
            <div className='control'>
            <div className='program-control'>
                PRO
                <div className='controls'>
                    <div className='each-control' onClick={()=>setVol((vol+1)<=maxVol ? vol+1 :vol )}>+</div>
                    <div className='each-control' onClick={()=>setVol((vol-1)>=0 ? vol-1 :vol )}>-</div>
                </div>
            </div>
            <div className='volume-control'>
                VOL
                <div className='controls'>
                    <div className='each-control' onClick={()=>setActiveChannel((activeChannel+1) % maxChannel)}>+</div>
                    <div className='each-control' onClick={()=>setActiveChannel((activeChannel-1) % maxChannel)}>-</div>
                </div>
            </div>
            </div>
        </div>
    )
}
