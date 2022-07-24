import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './style/style.css';
import { iconsData } from './components/iconsData.js';
import Facebook from './components/Facebook.jsx';
import Math from './components/Math.jsx';
import Music from './components/Music.jsx';
import TakeBreak from './components/TakeBreak.jsx';
import { useChromeStorageLocal } from 'use-chrome-storage';
function Popup() {
  const [time, setTime] = useChromeStorageLocal('time', 5);
  const [running, setRunning] = useState(false);

  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [song, setSong] = useChromeStorageLocal('song');
  const [nameSong, setNameSong] = useChromeStorageLocal('nameSong');

  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(0);

  const result = new Date(time * 1000)?.toISOString()?.slice(14, 19);

  useEffect(() => {
    if (time >= 10) {
      setMinutes(result.slice(-2));
    } else {
      setMinutes(result.slice(-1));
    }
  }, [time]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        if (minutes == 0) {
          setRunning(true);
          clearInterval(myInterval);
          setTimeout(() => {
            setMinutes(time);
            setSeconds(0);
            setRunning(false);
          }, 1500);
          return;
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="container">
      <div className="header">
        <img
          src="https://cdn.dribbble.com/userupload/2445209/file/original-d45babbe55d48c68d3f0ae902a7dbf95.png?compress=1&resize=1200x900"
          alt=""
        />
        <button
          className={toggle ? 'switch active' : 'switch'}
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      </div>
      <div className="body">
        {active === 0 && (
          <TakeBreak
            time={time}
            setTime={setTime}
            running={running}
            setRunning={setRunning}
            song={song}
            result={result}
            nameSong={nameSong}
            setSeconds={setSeconds}
            setMinutes={setMinutes}
            minutes={minutes}
            seconds={seconds}
          />
        )}
        {active === 1 && <Music setNameSong={setNameSong} setSong={setSong} />}
        {active === 2 && <Math />}
        {active === 3 && <Facebook />}
      </div>
      <div className="footer">
        {iconsData.map(item => (
          <div
            key={item.key}
            onClick={() => setActive(item.key)}
            className={
              active === item.key
                ? 'navigate-icon navigate-icon-active'
                : 'navigate-icon'
            }
          >
            <img
              className="icon"
              src={active === item.key ? item.animated : item.icon}
              alt="icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

render(<Popup />, document.getElementById('root'));
