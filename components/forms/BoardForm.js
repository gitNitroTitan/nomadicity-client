import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBoard, updateBoard } from '../../api/boardsData';

const initialState = {
  boardName: '',
  boardImage: '',
  boardDescription: '',
};

function BoardForm({ boardObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (boardObj.firebaseKey) setFormInput(boardObj);
  }, [boardObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardObj.firebaseKey) {
      updateBoard(formInput)
        .then(() => router.push('/boards'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBoard(payload).then(() => {
        router.push('/boards');
      });
    }
  };
  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3>Board Form</h3>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Board Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter Board Title" name="boardName" value={formInput.boardName} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Board Image" className="mb-3">
            <Form.Control type="url" placeholder="Enter board image Url" name="boardImage" value={formInput.boardImage} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Board Description" className="mb-3">
            <Form.Control type="text" placeholder="Enter description" name="boardDescription" value={formInput.boardDescription} onChange={handleChange} required />
          </FloatingLabel>

          <Button variant="secondary" type="submit">{boardObj.firebaseKey ? 'Update' : 'Create'} Board</Button>
        </Form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}

BoardForm.propTypes = {
  boardObj: PropTypes.shape({
    boardName: PropTypes.string,
    boardDescription: PropTypes.string,
    boardImage: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BoardForm.defaultProps = {
  boardObj: initialState,
};

export default BoardForm;
