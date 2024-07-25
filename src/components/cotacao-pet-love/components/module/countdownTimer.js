import { useEffect, useState } from "react";

export default function CountdownTimer({ modalState, expiration, expired }) {
    const [timeLeft, setTimeLeft] = useState(null);

    const [expirated, setExpirated] = useState(false);

    const [autoUpdate, setAutoUpdate] = useState(false);
    
    const [timeData, setTimeData] = useState({
        minutes: "30",
        seconds: "00"
    });

    var pixInterval = null;

    setTimeout(()=>{
        setAutoUpdate(!autoUpdate);
        return;
    }, 2000);

    useEffect(()=>{        
        try{ 
            if (!expiration) {
                return;
            }

            if (pixInterval){
                clearInterval(pixInterval);
            }            

            var _expiration = new Date(expiration);

            pixInterval = setInterval(()=>{
                let now = new Date();
                let timeLeft = _expiration - now;

                //console.log('Time left:', timeLeft)
                
                if (timeLeft <= 0 && !expirated){
                    clearInterval(pixInterval);

                    expired(true);

                    setExpirated(true);

                    return;
                }

                if (expirated){
                    setExpirated(false);
                }

                timeData.minutes = Math.floor(timeLeft / 60000);
                timeData.minutes = timeData.minutes < 0 ? 0 : timeData.minutes;
                timeData.minutes = timeData.minutes.toString().padStart(2, '0');

                timeData.seconds = ((timeLeft % 60000) / 1000).toFixed(0);
                timeData.seconds = timeData.seconds < 0 ? 0 : timeData.seconds;
                timeData.seconds = timeData.seconds.toString().padStart(2, '0');

                setTimeData(timeData);
                setTimeLeft(timeLeft);
            }, 1000);

        }catch(error){
            console.error('Timer error:', error);
        }       

    }, [timeLeft, modalState, autoUpdate]);

    return (
        <div
            id="pix-timer"
            className="text-sm font-bold text-bluePrime"
        >
            {timeData.minutes} minuto{parseInt(timeData.minutes) > 1 ? 's' : ''} {timeData.seconds} segundo{parseInt(timeData.seconds) > 1 ? 's' : ''}
        </div>
    );
}