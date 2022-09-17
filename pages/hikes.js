import React, { useState, useEffect } from 'react';
import { getHikes } from '../api/hikesData';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import HikeCard from '../components/HikeCard';

function Hikes() {
  // eslint-disable-next-line no-unused-vars
  const [hike, setHikes] = useState([]);

  const { user } = useAuth();

  const getAllTheHikes = () => {
    getHikes(user.uid).then((hikesArray) => {
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
        <HikeCard hikeObj={hikes} key={hikes.firebaseKey} onUpdate={getAllTheHikes} />
      ))}
    </div>
  );
}

export default Hikes;
