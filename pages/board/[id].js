import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { viewBoardDetails } from '../../api/mergedData';
import HikeCard from '../../components/HikeCard';

function ViewBoard() {
  const [boardDetails, setBoardDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getBoardDetails = () => {
    viewBoardDetails(id).then((response) => setBoardDetails(response));
  };

  useEffect(() => {
    getBoardDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="mainContainer">
        {boardDetails.hikes?.map((hike) => (
          <HikeCard key={hike.id} hikeObj={hike} onUpdate={getBoardDetails} />
        ))}
      </div>
    </>
  );
}

export default ViewBoard;
