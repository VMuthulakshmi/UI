import React from 'react';
import { useState,useEffect } from 'react';
import Image from '../image';
import data from "../../data.json";
import PropTypes from 'prop-types';

import "./TV.scss";

function getChannel(channels,index){
    return (
        <div>
            <div key={channels[index].id} className={`each-channel ${channels[index].subscribed? 'subscribed':'not-subscribed'}`}>
                <div className='channel-no'>{channels[index].channelNo}</div>
                <Image src={channels[index].image} className={'channel-image'}/>
            </div> 
        </div>  
    )
}


function setSubscribe(channels,index,setChannels){
    console.log("Here///")
    setChannels((prevState) => 
        prevState.map((item) =>
        {
            console.log("item ",item.id,index);
            return (          
                item.id == (index+1) ? { ...item, subscribed: true } : item
                )
        }

        ),
    );
}

function subscriptionLayout(channels,index,setChannels){
    if(channels[index] && !channels[index].subscribed){
       return (
            <div>
                <div className='subscribed-text'>Channel is not subscribed</div>
                <div className='not-subscribed' onClick={()=>{setSubscribe(channels,index,setChannels)}}>SUBSCRIBE</div>
            </div>
       ) 
    }
    return (<div>{channels[index].subscribed }</div>)
}

function getVolume(volume){
    const rows = [];
    for(let i = 0; i < volume; i++) {
        rows.push( <div key={i} className='white-bar'></div>);
    }
   return rows;
}


export default function TV({on,activeChannel,volume}) {

    const [showVol, setShowVol] = useState(false);
    const [showChNo, setShowChNo] = useState(false);
    const [channels, setChannels] = useState(data)


    useEffect(()=>{
        console.log("Channels",channels)
    },[channels])
    useEffect(() => { 
        setShowVol(true);
        // Creating a timeout within the useEffect hook 
        setTimeout(() => { 
            setShowVol(false); 
        }, 5000); 
    }, [volume]); 

    useEffect(() => { 
        setShowChNo(true);
        // Creating a timeout within the useEffect hook 
        setTimeout(() => { 
            setShowChNo(false); 
        }, 3000); 
    }, [activeChannel]); 

    return (
        <div className={`tv ${on ? 'show': ''}`}>
            <div className={`channels  ${showChNo ? '': 'hide'} `}>
                {getChannel(channels,activeChannel) }
            </div>
            
            <div className={`volume-status ${showVol ? '': 'hide'}`}>
                <div className='volume-text'>{volume}</div>
                {
                    getVolume(volume)
                }
            </div>

            <div className='subscription-block'>
                {subscriptionLayout(channels,activeChannel,setChannels)}
            </div>
        </div>
    )
}


TV.propTypes = {
    on: PropTypes.bool,
    activeChannel: PropTypes.number,
    volume: PropTypes.number
};