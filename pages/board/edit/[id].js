import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoard } from '../../../api/boardsData';
import BoardForm from '../../../components/forms/BoardForm';

export default function EditBOard() {
  const [editBoards, setEditBoards] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleBoard(id).then(setEditBoards);
  }, [id]);

  return (
    <>
      <BoardForm boardObj={editBoards} />
    </>
  );
}
