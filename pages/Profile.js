import React, { useEffect, useState } from 'react';
import { getBoards } from '../api/boardsData';
import BoardCard from '../components/BoardCard';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const [board, setBoards] = useState([]);

  const { user } = useAuth();

  const getAllTheBoards = () => {
    getBoards(user.uid).then((boardsArray) => {
      setBoards(boardsArray);
    });
  };

  useEffect(() => {
    getAllTheBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="profile-head">
        Head of Profile
      </div>
      <div className="mainContainer">
        {board.map((boards) => (
          <BoardCard boardObj={boards} key={boards.firebaseKey} onUpdate={getBoards} />
        ))}
      </div>
    </>
  );
}
