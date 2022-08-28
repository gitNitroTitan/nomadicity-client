import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HikeCard from '../../components/HikeCard';
import { viewBoardDetails } from '../../api/mergedData';

function ViewBoard() {
  const [boardDetails, setBoardDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBoardDetails(firebaseKey).then(setBoardDetails);
  }, [firebaseKey]);

  return (
    <div className="hike-map">
      {boardDetails.hikes?.map((hikes) => (
        <HikeCard key={hikes.firebaseKey} hikeObj={hikes} />
      ))}
    </div>
  );
}

export default ViewBoard;
