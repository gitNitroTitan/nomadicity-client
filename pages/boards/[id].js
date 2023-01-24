import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoard, viewBoardDetails } from '../../api/boardsData';
import BoardCardLite from '../../components/BoardCardLite';
import HikeCard from '../../components/HikeCard';

function ViewBoard() {
  const [boards, setBoards] = useState({});
  const [hikes, setHikes] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getBoardDetails = async () => {
    getSingleBoard(id).then(setBoards);
    await viewBoardDetails(id).then((response) => setHikes(response));
  };

  useEffect(() => {
    getBoardDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="boardContainer">
        <BoardCardLite boardObj={boards} key={boards.id} /><hr />
        <div className="hikesContainer">
          {hikes.hikes?.map((hike) => (
            <HikeCard key={hike.id} hikeObj={hike} onUpdate={getBoardDetails} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewBoard;
