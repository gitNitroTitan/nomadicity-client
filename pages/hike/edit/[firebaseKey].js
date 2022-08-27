import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleHike } from '../../../api/hikesData';
import HikeForm from '../../../components/forms/HikeForm';

export default function EditHike() {
  const [editHikes, setEditHikes] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleHike(firebaseKey).then(setEditHikes);
  }, [firebaseKey]);
  console.warn(editHikes);

  return (
    <>
      <HikeForm hikeObj={editHikes} />
    </>
  );
}
