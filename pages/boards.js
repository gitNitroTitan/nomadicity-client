import React, { useState, useEffect } from 'react';
// import { getBoards } from '../api/boardsData';
// import { signOut } from '../utils/auth';
import getUserByUid from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import BoardCard from '../components/BoardCard';

function Boards() {
  // eslint-disable-next-line no-unused-vars
  const [boards, setBoards] = useState([]);

  const { user } = useAuth();

  const getUserBoards = () => {
    getUserByUid(user.id).then((response) => setBoards(response.boards));
  };

  useEffect(() => {
    getUserBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainContainer">
      {boards?.map((board) => (
        <BoardCard boardObj={board} key={board.id} onUpdate={getUserBoards} />
      ))}
    </div>
  );
}

export default Boards;
