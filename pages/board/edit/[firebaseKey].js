import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoard } from '../../../api/boardsData';
import BoardForm from '../../../components/forms/BoardForm';

export default function EditBOard() {
  const [editBoards, setEditBoards] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBoard(firebaseKey).then(setEditBoards);
  }, [firebaseKey]);

  return (
    <>
      <BoardForm boardObj={editBoards} />
    </>
  );
}
