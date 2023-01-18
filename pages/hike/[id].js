/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleHike } from '../../api/hikesData';
import HikeCard from '../../components/HikeCard';

export default function IndHikePage(onUpdate) {
  const [hikeDetails, setHikeDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleHike(id).then(setHikeDetails);
  }, [id]);

  return (
    <>
      <div className="edit-hike-container">
        <HikeCard
          key={id}
          hikeObj={hikeDetails}
          onUpdate={onUpdate}
        />
      </div>
    </>
  );
}
