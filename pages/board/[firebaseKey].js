import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoard } from '../../api/boardsData';
import HikeCard from '../../components/HikeCard';

export default function IndBoardPage() {
  const [boardDetails, setBoardDetails] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getBoardDetails = () => {
    getSingleBoard(firebaseKey).then((response) => {
      setBoardDetails(response);
    });
  };

  useEffect(() => {
    getBoardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div className="hike-map">
        {boardDetails?.hikes.map((hike) => (
          <HikeCard key={hike.firebaseKey} hikeObj={hike} onUpdate={getBoardDetails} />
        ))}
      </div>
    </>
  );
}
