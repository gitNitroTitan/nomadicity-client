import React, { useState, useEffect } from 'react';
// import { getHikes } from '../api/hikesData';
import { useAuth } from '../utils/context/authContext';
import HikeCard from '../components/HikeCard';

function Hikes() {
  // eslint-disable-next-line no-unused-vars
  const [hike, setHikes] = useState([]);

  const { user } = useAuth();

  const getUserHikes = () => {
    setHikes(user.hikes);
    // console.warn(user.hikes);
  };

  useEffect(() => {
    getUserHikes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainContainer">
      {hike.map((hikes) => (
        <HikeCard hikeObj={hikes} key={hikes.id} onUpdate={getUserHikes} />
      ))}
    </div>
  );
}

export default Hikes;
