import React, { useState, useEffect } from 'react';
import LikeAnimation from './like/LikeAnimation.jsx';
import { SongsData } from './music/SongsData.js';
function Music({ setNameSong, setSong }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [renderingSongs, setRenderingSongs] = useState();
  const [currentSong, setCurrentSong] = useState('');
  const [currentTopSongs, setCurrentTopSongs] = useState('Nhạc Trẻ');

  useEffect(() => {
    const getAllMusic = async () => {
      setLoading(true);
      await fetch(
        'https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR0WGpSqnYR-rtXcdoH48kMqBwMhgtcjzjExN7e_EiCs5BZfdDqXkMz5SbI'
      )
        .then(res => res.json())
        .then(data => setData(data?.songs?.top100_VN));
      setLoading(false);
    };
    getAllMusic();
  }, []);

  useEffect(() => {
    if (data && currentTopSongs === 'Nhạc Trẻ') setRenderingSongs(data[0]);
    if (data && currentTopSongs === 'Trữ Tình') setRenderingSongs(data[1]);
    if (data && currentTopSongs === 'Nhạc Trịnh') setRenderingSongs(data[2]);
    if (data && currentTopSongs === 'EDM Việt') setRenderingSongs(data[5]);
    if (data && currentTopSongs === 'Rap Việt') setRenderingSongs(data[4]);
  }, [currentTopSongs, data]);

  return (
    <div className="musicContainer">
      {loading && (
        <img
          style={{ userSelect: 'none', width: '100%', height: '100%' }}
          src="https://cdn.dribbble.com/users/722246/screenshots/16072725/media/5941bfc1daa4f1ea98ed052269e10b90.gif"
          alt="loading"
        />
      )}

      {!loading && renderingSongs && (
        <>
          <ul className="songs-cate">
            {SongsData.map((item, index) => (
              <li
                onClick={() => setCurrentTopSongs(item?.name)}
                className="option"
                key={index}
              >
                <img className="coverCate" src={item.url} alt="song" />
                <p style={{ fontWeight: '500' }}>{item?.name}</p>
              </li>
            ))}
          </ul>
          {/* list musics */}
          <div className="listSongs">
            {renderingSongs.songs.slice(0, 70).map((item, index) => (
              <div
                key={index}
                onClick={() => setCurrentSong(item.music)}
                id={item?.music === currentSong ? 'activeSong' : 'inActiveSong'}
                className="singleSong"
              >
                <div className="singleSongLeft">
                  <div className="songLeft">
                    <img
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                      }}
                      src={item.avatar}
                      alt="song"
                    />
                  </div>
                  <div className="songRight">
                    <div className="songTitle">{item?.title}</div>
                    <div className="songAuthor">{item?.creator}</div>
                  </div>
                  <div className="tym">
                    {item.music === currentSong && (
                      <LikeAnimation
                        setNameSong={setNameSong}
                        setSong={setSong}
                        item={item}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <video
            autoPlay={true}
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
            src={currentSong}
            controls
          />
        </>
      )}
    </div>
  );
}

export default Music;
