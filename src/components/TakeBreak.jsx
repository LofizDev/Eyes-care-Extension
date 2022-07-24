import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useEffect, useRef, useState } from 'react';
import reset from '../images/reset.png';
import playIcon from '../images/play.png';
import pauseIcon from '../images/pause.png';

function TakeBreak({
  song,
  nameSong,
  time,
  setTime,
  minutes,
  seconds,
  running,
  setRunning,
  result,
  setMinutes,
  setSeconds,
}) {
  const songRef = useRef();
  const [isPlay, setIsPlay] = useState(true);
  const [currentSong, setCurrentSong] = useState();

  const [isExercises, setIsExercises] = useState(true);
  const [notification, setNotification] = useState(true);
  const [message, setMessage] = useState('Prevent Default');

  const pause = async () => {
    await songRef.current.pause();
  };
  const play = async () => {
    await songRef.current.play();
  };

  useEffect(() => {
    if (running) {
      play();
      setIsPlay(false);
      if (isExercises) {
        window.open(
          'https://exercises-slider.vercel.app',
          '_blank',
          'noopener,noreferrer'
        );
      }
    }
  }, [running]);

  const restart = () => {
    if (time >= 10) {
      setMinutes(result.slice(-2));
      setSeconds(0);
    } else {
      setMinutes(result.slice(-1));
      setSeconds(0);
    }
  };

  return (
    <div className="takeBreak-container">
      <div className="takeBreak">
        <div className="takeBreak-content">
          Take break, every {time} minutes.
        </div>
        <div style={{ marginTop: '4px' }} className="takeBreak-controls">
          <Slider
            value={time}
            onChange={value => setTime(value)}
            min={0}
            max={60}
          />
        </div>
      </div>
      <div className="takeBreak">
        <div className="takeBreak-content">
          <p>Show exercises page:</p>
          {currentSong}
        </div>
        <div className="takeBreak-controls">
          <button
            className={
              isExercises
                ? 'switch-exercises active-exercises'
                : 'switch-exercises'
            }
            onClick={() => {
              setIsExercises(!isExercises);
            }}
          />
        </div>
      </div>
      <div className="takeBreak">
        <div className="takeBreak-content">
          <p>Show notification message:</p>
        </div>
        <div className="takeBreak-controls">
          <button
            className={
              notification
                ? 'switch-exercises active-exercises'
                : 'switch-exercises'
            }
            onClick={() => {
              setNotification(!notification);
            }}
          />
        </div>
      </div>
      {/* Custom notification */}
      {notification && (
        <div className="takeBreak">
          <div className="takeBreak-content">Custom message:</div>
          <div className="takeBreak-controls">
            <input
              className="custom-msg"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: '12px' }} className="takeBreak">
        <div className="takeBreak-content">Play sound:</div>
        <div className="takeBreak-controls">
          {nameSong}
          {isPlay ? (
            <img
              onClick={() => {
                setIsPlay(!isPlay);
                play();
              }}
              style={{
                marginLeft: '3px',
                cursor: 'pointer',
                marginRight: '2px',
              }}
              src={playIcon}
              width="13px"
            />
          ) : (
            <img
              style={{
                marginLeft: '3px',
                cursor: 'pointer',
                marginRight: '2px',
              }}
              onClick={() => {
                setIsPlay(!isPlay);
                pause();
              }}
              src={pauseIcon}
              width="13px"
            />
          )}
        </div>
      </div>
      <div onClick={restart} className="reset">
        <p>Reset</p>
        <img src={reset} width="12px" />
      </div>
      <div className="countDown">
        <div>
          {minutes}:{seconds}
        </div>
      </div>
      <audio
        onLoadedData={isPlay ? pause : play}
        ref={songRef}
        style={{
          visibility: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          zIndex: -1,
          left: '-300px',
          backgroundColor: 'red',
        }}
        src={song}
        controls
      />
    </div>
  );
}

export default TakeBreak;
