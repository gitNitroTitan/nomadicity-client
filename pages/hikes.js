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
    // window.location.reload();
  };

  useEffect(() => {
    getUserHikes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainContainer">
      {hike.map((hikes) => (
        <HikeCard hikeObj={hikes} key={hikes.id} />
      ))}
    </div>
  );
}

export default Hikes;
