import React from 'react';
import { useState } from 'react';
import './like.style.css';

function LikeAnimation({ item, setNameSong, setSong }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeSong = () => {
    setIsLiked(!isLiked);
    setSong(item?.music);
    setNameSong(item?.title);
  };
  return (
    <div
      style={{ backgroundPosition: isLiked ? 'right' : 'left' }}
      onClick={handleLikeSong}
      className={isLiked ? 'is_animating heart' : 'heart'}
    ></div>
  );
}

export default LikeAnimation;
