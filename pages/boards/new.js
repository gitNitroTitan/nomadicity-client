import React from 'react';
import BoardForm from '../../components/forms/BoardForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewBoard() {
  const { user } = useAuth();
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <BoardForm user={user} />
    </div>
  );
}
