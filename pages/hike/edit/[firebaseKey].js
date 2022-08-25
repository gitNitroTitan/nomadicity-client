import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBoardByFirebaseKey } from '../../../api/mergedData';
import HikeForm from '../../../components/forms/HikeForm';

export default function EditHike() {
  const [editHikes, setEditHikes] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getBoardByFirebaseKey(firebaseKey).then(setEditHikes);
  }, [firebaseKey]);

  return (<HikeForm obj={editHikes} />);
}
