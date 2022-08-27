import React, { useState, useEffect } from 'react';
import { getHikes } from '../api/hikesData';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import HikeCard from '../components/HikeCard';

function Home() {
  const [hike, setHikes] = useState([]);

  const getAllTheHikes = () => {
    getHikes().then((hikesArray) => {
      setHikes(hikesArray);
    });
  };

  useEffect(() => {
    getAllTheHikes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainContainer">
      {hike.map((hikes) => (
        <HikeCard hikeObj={hikes} key={hikes.firebaseKey} onUpdate={getHikes} />
      ))}
    </div>
  );
}

export default Home;
