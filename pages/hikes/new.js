import React from 'react';
import HikeForm from '../../components/forms/HikeForm';
// import { useAuth } from '../../utils/context/authContext';

export default function NewHike() {
  // const { user } = useAuth;

  return (
    <>
      <div className="create-form" />
      <HikeForm />
    </>
  );
}
