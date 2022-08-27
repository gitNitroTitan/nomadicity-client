import React, { useState, useEffect } from 'react';
import { getBoards } from '../api/boardsData';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import BoardCard from '../components/BoardCard';

function Boards() {
  // eslint-disable-next-line no-unused-vars
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
    <div className="mainContainer">
      {board.map((boards) => (
        <BoardCard boardObj={boards} key={boards.firebaseKey} onUpdate={getBoards} />
      ))}
    </div>
  );
}

export default Boards;
