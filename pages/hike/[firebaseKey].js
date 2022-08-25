/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllHikes, getSingleHikeDetails } from '../../api/hikesData';
import HikeCard from '../../components/HikeCard';
// import { useAuth } from '../../utils/context/authContext';

export default function IndHikePage(onUpdate) {
  const router = useRouter();
  const [hikeDetails, setHikeDetails] = useState();
  const [hikes, setHikes] = useState([]);
  const { firebaseKey } = router.query;
  // const { user } = useAuth();

  const getAllOfTheHikesDetails = () => {
    getAllHikes().then((hikesArray) => {
      setHikes(hikesArray.filter((hike) => hike.user === hikeDetails?.user.handle));
    });
  };

  useEffect(() => {
    getAllOfTheHikesDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hikeDetails]);

  function getHikeDetails(key) {
    getSingleHikeDetails(key).then(setHikeDetails);
  }

  useEffect(() => {
    getHikeDetails(firebaseKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <HikeCard
        hikeObj={hikeDetails}
        onUpdate={onUpdate}
      />
      <p className="hikeUserDetail"> More Hikes</p>
      <div className="gridContainer">
        {hikes?.map((hike) => (
          <HikeCard hikeObj={hike} key={hike.firebaseKey} onUpdate={getAllHikes} />
        ))}
      </div>
    </>
  );
}
