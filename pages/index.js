import React, { useState, useEffect } from 'react';
import { getAllHikes } from '../api/hikesData';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import HikeCard from '../components/HikeCard';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [hike, setHikes] = useState([]);

  const { user } = useAuth();

  const getAllTheHikes = () => {
    getAllHikes(user.uid).then((hikesArray) => {
      setHikes(hikesArray);
    });
  };

  useEffect(() => {
    getAllTheHikes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <div
    //   className="text-center d-flex flex-column justify-content-center align-content-center"
    //   style={{
    //     height: '90vh',
    //     padding: '30px',
    //     maxWidth: '400px',
    //     margin: '0 auto',
    //   }}
    // >
    //   <h1>Hello {user.displayName}! </h1>
    //   <p>Click the button below to logout!</p>
    //   <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
    //     Sign Out
    //   </button>
    // </div>
    <div className="mainContainer">
      {hike.map((hikes) => (
        <HikeCard hikeObj={hikes} key={hikes.firebaseKey} onUpdate={getAllHikes} />
      ))}
      {/* <button type="button" size="lg" className="btn signBtn btn-primary btn-large" onClick={() => addPinToBoard('-N9Kj_rtAvEH6nVyJbxY', '-N93JBVBPQjDjh3A_YVR')}>
      Test Button
    </button> */}
    </div>
  );
}

export default Home;
