import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createBoard, updateBoard } from '../../api/boardsData';

const initialState = {
  name: '',
  image: '',
  description: '',
};

function BoardForm({ boardObj }) {
  const [formInputs, setFormInputs] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (boardObj.firebaseKey) setFormInputs(boardObj);
  }, [boardObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardObj.firebaseKey) {
      updateBoard(formInputs)
        .then(() => router.push(`/board/${boardObj.firebaseKey}`));
    } else {
      const payload = { ...formInputs, user: user.handle, time: new Date().getTime() };
      createBoard(payload).then(() => {
        router.push(`/profile/${user.handle}`);
      });
    }
  };
  return (
    <div className="card text-center text-dark bg-light mb-3">
      <div className="card-header">
        Board Form
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Board Title
              <input type="text" id="board-name" className="form-control" placeholder="Title of Board" name="name" value={formInputs.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Board Image or Video
              <input type="url" id="image-url" className="form-control" placeholder="Enter an image url" name="image" value={formInputs.image} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Board Description
              <input type="text" id="board-desc" className="form-control" placeholder="Description" name="description" value={formInputs.description} onChange={handleChange} required />
            </label>
          </div>
          <div className="btn-group-vertical">
            <button type="submit" className="btn btn-dark">{boardObj.firebaseKey ? 'Update' : 'Create'} Board</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}

BoardForm.propTypes = {
  boardObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BoardForm.defaultProps = {
  boardObj: initialState,
};

export default BoardForm;
