import React,{useState, useEffect, useRef} from "react";

function Stopwatch(){

    const [isRunning,setIsRunning]=useState(false);
    const [elapsed,setElapsed]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current=setInterval(()=>{
                setElapsed(Date.now()-startTimeRef.current)
            },10);
        }

        return ()=>{
            clearInterval(intervalIdRef.current)
        }

    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current=Date.now()-elapsed;
    }


    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsed(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours=Math.floor(elapsed/(1000*60*60));
        let minutes=Math.floor(elapsed/(1000*60)%60);
        let seconds=Math.floor(elapsed/(1000)%60);
        let milli=Math.floor((elapsed%1000)/10);
        

        hours=String(hours).padStart(2,"0");
        minutes=String(minutes).padStart(2,"0");
        seconds=String(seconds).padStart(2,"0");
        milli=String(milli).padStart(2,"0");


        return `${minutes}:${seconds}:${milli}`;
    }

    return(
        <div className="container">
            <div className="display">
                {formatTime()}
            </div>
            <div className="controls">
                <button className="start" onClick={start}>Start</button>
                <button className="stop" onClick={stop}>Stop</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch