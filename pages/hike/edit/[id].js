import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleHike } from '../../../api/hikesData';
import HikeForm from '../../../components/forms/HikeForm';

export default function EditHike() {
  const [editHikes, setEditHikes] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleHike(id).then(setEditHikes);
  }, [id]);

  return (
    <>
      <HikeForm key={id} hikeObj={editHikes} />
    </>
  );
}
